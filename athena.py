import os, json, math, time, queue, threading, datetime, subprocess, platform, re
import urllib.request
import urllib.parse
from pathlib import Path
from dotenv import load_dotenv
import tkinter as tk

try:
    from groq import Groq
    GROQ_OK = True
except ImportError:
    GROQ_OK = False

try:
    import openai
    OPENAI_OK = True
except ImportError:
    OPENAI_OK = False

try:
    import speech_recognition as sr
    SR_OK = True
except ImportError:
    SR_OK = False

try:
    import pyttsx3
    TTS_OK = True
except ImportError:
    TTS_OK = False

try:
    import pvporcupine
    WAKE_OK = True
except ImportError:
    WAKE_OK = False

load_dotenv()

STATE_IDLE      = "idle"
STATE_LISTENING = "listening"
STATE_THINKING  = "thinking"
STATE_SPEAKING  = "speaking"

MEMORY_PATH = Path.home() / ".athena_memory.json"
AUTH_PATH   = Path.home() / ".athena_auth.json"
MAX_MEMORY  = 40
OS          = platform.system()

def load_memory():
    try:
        return json.loads(MEMORY_PATH.read_text()) if MEMORY_PATH.exists() else []
    except:
        return []

def save_memory(h):
    MEMORY_PATH.write_text(json.dumps(h[-MAX_MEMORY:], ensure_ascii=False, indent=2))

def load_auth():
    try:
        return json.loads(AUTH_PATH.read_text()) if AUTH_PATH.exists() else {}
    except:
        return {}

def save_auth(name):
    AUTH_PATH.write_text(json.dumps({
        "user": name,
        "registered": datetime.datetime.now().isoformat()
    }))

def get_weather(city):
    try:
        city_enc = urllib.parse.quote(city)
        geo_url  = (
            f"https://geocoding-api.open-meteo.com/v1/search"
            f"?name={city_enc}&count=1&language=en&format=json"
        )
        with urllib.request.urlopen(geo_url, timeout=6) as resp:
            geo = json.loads(resp.read())

        if not geo.get("results"):
            return f"City '{city}' not found. Please check the spelling."

        r         = geo["results"][0]
        lat       = r["latitude"]
        lon       = r["longitude"]
        city_name = r["name"]
        country   = r.get("country", "")

        wx_url = (
            f"https://api.open-meteo.com/v1/forecast"
            f"?latitude={lat}&longitude={lon}"
            f"&current=temperature_2m,relative_humidity_2m,apparent_temperature,"
            f"weather_code,wind_speed_10m,precipitation"
            f"&wind_speed_unit=kmh&timezone=auto"
        )
        with urllib.request.urlopen(wx_url, timeout=6) as resp:
            wx = json.loads(resp.read())

        cur      = wx["current"]
        temp     = round(cur["temperature_2m"])
        feels    = round(cur["apparent_temperature"])
        humidity = cur["relative_humidity_2m"]
        wind     = round(cur["wind_speed_10m"])
        rain     = cur.get("precipitation", 0)
        wc       = cur["weather_code"]

        if wc == 0:    desc = "Clear sky"
        elif wc <= 3:  desc = "Partly cloudy"
        elif wc <= 48: desc = "Foggy"
        elif wc <= 67: desc = "Rainy"
        elif wc <= 77: desc = "Snowy"
        elif wc <= 82: desc = "Rain showers"
        elif wc <= 99: desc = "Thunderstorm"
        else:          desc = "Mixed conditions"

        rain_str = f" Rainfall {rain}mm." if rain > 0 else ""
        return (
            f"Weather in {city_name}, {country}: {desc}. "
            f"Temperature {temp}C, feels like {feels}C. "
            f"Humidity {humidity}%, wind {wind} kmh.{rain_str}"
        )
    except Exception as e:
        return f"Could not fetch weather: {e}"

APP_ALIASES = {
    "chrome":        "Google Chrome" if OS == "Darwin" else "chrome",
    "google chrome": "Google Chrome" if OS == "Darwin" else "chrome",
    "firefox":       "Firefox" if OS == "Darwin" else "firefox",
    "notepad":       "notepad" if OS == "Windows" else "TextEdit",
    "calculator":    "Calculator",
    "spotify":       "Spotify",
    "vscode":        "Visual Studio Code",
    "vs code":       "Visual Studio Code",
    "word":          "Microsoft Word",
    "excel":         "Microsoft Excel",
    "terminal":      "Terminal" if OS != "Windows" else "cmd",
    "file explorer": "explorer",
    "paint":         "mspaint",
    "whatsapp":      "WhatsApp",
    "telegram":      "Telegram",
    "zoom":          "Zoom",
    "slack":         "Slack",
    "discord":       "Discord",
    "vlc":           "VLC",
}

def open_app(name):
    real = APP_ALIASES.get(name.lower().strip(), name)
    try:
        if OS == "Windows":  subprocess.Popen(["start", real], shell=True)
        elif OS == "Darwin": subprocess.Popen(["open", "-a", real])
        else:                subprocess.Popen([real])
        return f"Opening {name}."
    except Exception as e:
        return f"Couldn't open {name}: {e}"

def open_folder(path):
    try:
        if OS == "Windows":  subprocess.Popen(["explorer", path])
        elif OS == "Darwin": subprocess.Popen(["open", path])
        else:                subprocess.Popen(["xdg-open", path])
        return f"Opening folder: {path}"
    except Exception as e:
        return f"Couldn't open folder: {e}"

def search_in_folder(folder, query):
    results = []
    root = Path(folder)
    if not root.exists(): return f"Folder not found: {folder}"
    for p in root.rglob(f"*{query}*"):
        results.append(str(p))
        if len(results) >= 10: break
    return ("Found: " + ", ".join(results[:5])) if results else f"No files matching '{query}'."

_alarm_ringing  = False
_reminders      = []

def _ring_alarm(message):
    global _alarm_ringing
    _alarm_ringing = True
    print(f"[Alarm] RINGING: {message}")
    try:
        import winsound
        winsound.MessageBeep(winsound.MB_ICONEXCLAMATION)
    except:
        pass
    repeat_msg = f"{message}. Press any key or say stop to dismiss."
    speak_text(repeat_msg)
    count = 0
    while _alarm_ringing and count < 20:
        time.sleep(3)
        if _alarm_ringing:
            speak_text(message)
            count += 1
    _alarm_ringing = False

def dismiss_alarm():
    global _alarm_ringing
    _alarm_ringing = False
    print("[Alarm] Dismissed.")

def set_alarm(alarm_time, message="Wake up! Your alarm is ringing."):
    try:
        h, m   = map(int, alarm_time.split(":"))
        now    = datetime.datetime.now()
        target = now.replace(hour=h, minute=m, second=0, microsecond=0)
        if target <= now: target += datetime.timedelta(days=1)
        wait   = (target - now).total_seconds()
        def _ring():
            time.sleep(wait)
            _ring_alarm(message)
        threading.Thread(target=_ring, daemon=True).start()
        t_str = target.strftime("%I:%M %p")
        return f"Alarm set for {t_str}. I will keep reminding you until you say stop."
    except Exception as e:
        return f"Couldn't set alarm: {e}"

def set_reminder(message, minutes):
    try:
        mins = int(minutes)
        def _remind():
            time.sleep(mins * 60)
            _ring_alarm(f"Reminder: {message}")
        threading.Thread(target=_remind, daemon=True).start()
        return f"Reminder set. I will remind you about '{message}' in {mins} minutes."
    except Exception as e:
        return f"Couldn't set reminder: {e}"

def list_reminders():
    return "Reminder feature is active. Just say: remind me to call John in 10 minutes."

def get_time():
    return "The current time is " + datetime.datetime.now().strftime("%I:%M %p") + "."

def get_date():
    return "Today is " + datetime.datetime.now().strftime("%A, %B %d, %Y") + "."

_last_document  = ""
_last_doc_title = "athena_document"
_doc_html_path  = Path.home() / "Desktop" / "athena_doc.html"

def write_to_chrome(text, title="Document"):
    global _last_document, _last_doc_title
    _last_document  = text
    _last_doc_title = title.replace(" ", "_").lower()

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<style>
  * {{ margin:0; padding:0; box-sizing:border-box; }}
  body {{
    background: #0a0a0f;
    color: #e8e8f0;
    font-family: 'Georgia', serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 40px 20px;
  }}
  .toolbar {{
    width: 860px;
    max-width: 100%;
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    justify-content: flex-end;
  }}
  .btn {{
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.2s;
  }}
  .btn-download {{
    background: linear-gradient(135deg,#00d4ff,#0080ff);
    color: #fff;
  }}
  .btn-download:hover {{ transform: scale(1.05); box-shadow: 0 4px 20px #00d4ff66; }}
  .btn-copy {{
    background: linear-gradient(135deg,#8800cc,#cc00ff);
    color: #fff;
  }}
  .btn-copy:hover {{ transform: scale(1.05); box-shadow: 0 4px 20px #cc00ff66; }}
  .btn-print {{
    background: linear-gradient(135deg,#336600,#44aa00);
    color: #fff;
  }}
  .btn-print:hover {{ transform: scale(1.05); }}
  .paper {{
    background: #ffffff;
    color: #111;
    width: 860px;
    max-width: 100%;
    min-height: 1100px;
    padding: 80px 90px;
    border-radius: 4px;
    box-shadow: 0 8px 60px #00000088;
    font-size: 16px;
    line-height: 1.9;
    white-space: pre-wrap;
    outline: none;
    font-family: 'Times New Roman', serif;
  }}
  .paper:focus {{ box-shadow: 0 8px 60px #00d4ff33; }}
  .athena-badge {{
    margin-top: 24px;
    font-size: 12px;
    color: #334;
    letter-spacing: 2px;
  }}
</style>
</head>
<body>
<div class="toolbar">
  <button class="btn btn-copy" onclick="copyText()">📋 Copy</button>
  <button class="btn btn-print" onclick="window.print()">🖨️ Print</button>
  <button class="btn btn-download" onclick="downloadDoc()">⬇️ Download</button>
</div>
<div class="paper" contenteditable="true" id="doc">{text.replace(chr(10), '<br>').replace(chr(34), '&quot;')}</div>
<div class="athena-badge">✦ Created by ATHENA AI ✦</div>

<script>
function downloadDoc() {{
  const content = document.getElementById('doc').innerText;
  const blob = new Blob([content], {{type: 'text/plain'}});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '{_last_doc_title}.txt';
  a.click();
}}
function copyText() {{
  const content = document.getElementById('doc').innerText;
  navigator.clipboard.writeText(content).then(() => {{
    alert('Copied to clipboard!');
  }});
}}
</script>
</body>
</html>"""

    try:
        _doc_html_path.write_text(html, encoding="utf-8")
   
        chrome_paths = [
            r"C:\Program Files\Google\Chrome\Application\chrome.exe",
            r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        ]
        opened = False
        for cp in chrome_paths:
            if Path(cp).exists():
                subprocess.Popen([cp, str(_doc_html_path)])
                opened = True
                break
        if not opened:
          
            import webbrowser
            webbrowser.open(str(_doc_html_path))
        return f"I have opened your {title} in the browser. You can edit it, then click the Download button to save it, or say download it."
    except Exception as e:
        return f"Could not open Chrome: {e}"

def save_document(filename="athena_document"):
    global _last_document, _last_doc_title
    if not _last_document:
        return "No document to save yet. Ask me to write something first."
    try:
        desktop = Path.home() / "Desktop"
        desktop.mkdir(exist_ok=True)
        fn = filename.replace(" ","_").lower() if filename != "athena_document" else _last_doc_title
        # Save as txt
        txt_path = desktop / f"{fn}.txt"
        txt_path.write_text(_last_document, encoding="utf-8")
        # Also trigger browser download if HTML is open
        try:
            import pyautogui
            time.sleep(0.3)
            pyautogui.hotkey("ctrl", "s")
        except:
            pass
        subprocess.Popen(["explorer", "/select,", str(txt_path)])
        return f"Document saved to your Desktop as {fn}.txt and highlighted in File Explorer."
    except Exception as e:
        return f"Could not save: {e}"

_tts_proc  = None
_speaking  = False

VOICE      = "en-US-AriaNeural"
VOICE_RATE = "+8%"
VOICE_VOL  = "+20%"

def stop_speech():
    global _tts_proc, _speaking
    _speaking = False
    if _tts_proc and _tts_proc.poll() is None:
        try:
            _tts_proc.terminate()
            _tts_proc.kill()
        except:
            pass
        _tts_proc = None

def speak_text(text):
    global _tts_proc, _speaking
    stop_speech()
    _speaking = True

    try:
        import edge_tts, asyncio, pygame, io, tempfile

        async def _synth_all(full_text):
            comm = edge_tts.Communicate(full_text, voice=VOICE, rate=VOICE_RATE, volume=VOICE_VOL)
            buf = io.BytesIO()
            async for chunk in comm.stream():
                if chunk["type"] == "audio":
                    buf.write(chunk["data"])
            buf.seek(0)
            return buf

        try:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            audio_buf = loop.run_until_complete(_synth_all(text))
            loop.close()
        except Exception as e:
            print(f"[TTS synth error] {e}")
            _speaking = False
            return

        if not _speaking:
            return

        try:
            pygame.mixer.init(frequency=22050, size=-16, channels=1, buffer=512)
            pygame.mixer.music.load(audio_buf, "mp3")
            pygame.mixer.music.play()
            while pygame.mixer.music.get_busy():
                if not _speaking:
                    pygame.mixer.music.stop()
                    break
                time.sleep(0.05)
            pygame.mixer.quit()
        except Exception as e:
            print(f"[Pygame error] {e}, trying temp file...")
            tmp = Path.home() / ".athena_speech.mp3"
            tmp.write_bytes(audio_buf.read())
            _tts_proc = subprocess.Popen(
                ["PowerShell", "-Command",
                 f"Add-Type -AssemblyName presentationCore; "
                 f"$mp = New-Object System.Windows.Media.MediaPlayer; "
                 f"$mp.Open([System.Uri](Resolve-Path \'{str(tmp)}\')); "
                 f"$mp.Play(); Start-Sleep -Milliseconds 500; "
                 f"while ($mp.NaturalDuration.HasTimeSpan -and "
                 f"$mp.Position -lt $mp.NaturalDuration.TimeSpan) "
                 f"{{ Start-Sleep -Milliseconds 100 }}"],
                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
            )
            while _tts_proc.poll() is None:
                if not _speaking:
                    _tts_proc.terminate(); _tts_proc.kill(); break
                time.sleep(0.1)

    except ImportError as ie:
        print(f"[TTS] Missing library: {ie}. Install: pip install edge-tts pygame")
        safe = text.replace("'", " ").replace('"', " ")
        try:
            ps = (
                "Add-Type -AssemblyName System.Speech; "
                "$s = New-Object System.Speech.Synthesis.SpeechSynthesizer; "
                "$v = $s.GetInstalledVoices() | ForEach-Object { $_.VoiceInfo } | "
                "Where-Object { $_.Gender -eq \'Female\' }; "
                "if ($v) { $s.SelectVoice($v[0].Name) }; "
                "$s.Rate = 0; $s.Volume = 100; "
                f"$s.Speak(\'{safe}\')"
            )
            _tts_proc = subprocess.Popen(["PowerShell", "-Command", ps])
            while _tts_proc.poll() is None:
                if not _speaking:
                    _tts_proc.terminate(); _tts_proc.kill(); break
                time.sleep(0.1)
        except Exception as e:
            print(f"[TTS fallback error] {e}")
    except Exception as e:
        print(f"[TTS error] {e}")
    _speaking = False

SYSTEM_PROMPT = """\
You are Athena, a smart and helpful AI desktop voice assistant.
Keep spoken answers to 2-4 sentences for simple questions.
For questions about people, history, science or any factual topic give a complete answer.
Never cut off mid-explanation.

For desktop/system actions reply ONLY with valid JSON (no extra text, no markdown):
  {{"cmd":"open_app","name":"<app name>"}}
  {{"cmd":"open_folder","path":"<absolute path>"}}
  {{"cmd":"search_folder","folder":"<path>","query":"<search term>"}}
  {{"cmd":"set_alarm","time":"HH:MM","message":"<spoken message>"}}
  {{"cmd":"get_weather","city":"<city name>"}}
  {{"cmd":"get_time"}}
  {{"cmd":"get_date"}}
  {{"cmd":"write_document","content":"<full document text>","title":"<document title>"}}
  {{"cmd":"save_document","filename":"<filename without extension>"}}
  {{"cmd":"set_reminder","message":"<what to remind>","minutes":"<number>"}}
  {{"cmd":"dismiss_alarm"}}

When user asks to write a letter, email, essay or any document - generate the FULL content and use write_document cmd with a proper title.
When user says download it, save it, save the file - use save_document cmd.
When user says remind me to X in Y minutes - use set_reminder cmd.
When user says stop alarm, dismiss, snooze - use dismiss_alarm cmd.

For everything else reply in plain conversational text.
Current user: {user_name}
Current date/time: {now}
"""

def dispatch_cmd(cmd):
    c = cmd.get("cmd", "")
    if c == "open_app":       return open_app(cmd.get("name", ""))
    if c == "open_folder":    return open_folder(cmd.get("path", ""))
    if c == "search_folder":  return search_in_folder(cmd.get("folder",""), cmd.get("query",""))
    if c == "set_alarm":      return set_alarm(cmd.get("time",""), cmd.get("message","Wake up!"))
    if c == "get_weather":    return get_weather(cmd.get("city",""))
    if c == "get_time":       return get_time()
    if c == "get_date":       return get_date()
    if c == "write_document":  return write_to_chrome(cmd.get("content",""), cmd.get("title","Document"))
    if c == "save_document":   return save_document(cmd.get("filename","athena_document"))
    if c == "set_reminder":    return set_reminder(cmd.get("message","Reminder"), cmd.get("minutes",5))
    if c == "dismiss_alarm":   dismiss_alarm(); return "Alarm dismissed."
    return None

def build_system_prompt(user_name):
    now = datetime.datetime.now().strftime("%A %B %d %Y, %I:%M %p")
    return SYSTEM_PROMPT.format(user_name=user_name, now=now)

def query_llm(text, history, user_name="Sir"):
    system = build_system_prompt(user_name)
    msgs   = [{"role": "system", "content": system}]
    msgs  += history[-16:]
    msgs.append({"role": "user", "content": text})

    reply = ""

    groq_key = os.getenv("GROQ_API_KEY", "")
    if GROQ_OK and groq_key:
        try:
            client = Groq(api_key=groq_key)
            r = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=msgs,
                max_tokens=1024,
                temperature=0.7,
            )
            reply = r.choices[0].message.content.strip()
        except Exception as e:
            print(f"[Groq error] {e}")

    if not reply:
        oai_key = os.getenv("OPENAI_API_KEY", "")
        if OPENAI_OK and oai_key:
            try:
                client = openai.OpenAI(api_key=oai_key)
                r = client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=msgs,
                    max_tokens=1024,
                    temperature=0.7,
                )
                reply = r.choices[0].message.content.strip()
            except Exception as e:
                print(f"[OpenAI error] {e}")

    if not reply:
        return "No LLM API key found. Add GROQ_API_KEY to your .env file."

    try:
        m = re.search(r'\{[^{}]+\}', reply)
        if m:
            cmd    = json.loads(m.group())
            result = dispatch_cmd(cmd)
            if result is not None:
                return result
    except Exception:
        pass

    return reply

_mic_lock    = threading.Lock()
_wake_active = True              
_cmd_mode    = False             

def listen_once(timeout=8):
    global _wake_active, _cmd_mode
    if not SR_OK: return ""
    _cmd_mode    = True
    _wake_active = False         
    time.sleep(0.3)               
    rec = sr.Recognizer()
    rec.energy_threshold        = 250
    rec.dynamic_energy_threshold= True
    rec.pause_threshold         = 0.7
    try:
        with sr.Microphone() as src:
            rec.adjust_for_ambient_noise(src, duration=0.3)
            audio = rec.listen(src, timeout=timeout, phrase_time_limit=14)
        result = rec.recognize_google(audio)
        return result
    except sr.WaitTimeoutError:
        return ""
    except sr.UnknownValueError:
        return ""
    except Exception as e:
        print(f"[Listen error] {e}")
        return ""
    finally:
        _cmd_mode    = False
        _wake_active = True       # resume wake thread

def rgb2hex(r,g,b): return f"#{int(r):02x}{int(g):02x}{int(b):02x}"
def _b(c1,c2,t):
    t=max(0.0,min(1.0,t))
    return(int(c1[0]+(c2[0]-c1[0])*t),int(c1[1]+(c2[1]-c1[1])*t),int(c1[2]+(c2[2]-c1[2])*t))
def _a(c,a):
    a=max(0.0,min(1.0,a))
    return(int(c[0]*a),int(c[1]*a),int(c[2]*a))
def lerp_color(c1,c2,t): return _b(c1,c2,t)

STATE_PALETTES = {
    STATE_IDLE:      {"core":(2,8,30),  "mid":(10,30,110),"rim":(0,180,255), "accent":(100,20,255),"plasma":(0,220,255)},
    STATE_LISTENING: {"core":(1,15,8),  "mid":(2,50,22),  "rim":(0,255,120), "accent":(0,200,255), "plasma":(50,255,150)},
    STATE_THINKING:  {"core":(15,5,30), "mid":(50,8,90),  "rim":(180,0,255), "accent":(255,50,180),"plasma":(200,0,255)},
    STATE_SPEAKING:  {"core":(20,5,0),  "mid":(80,20,0),  "rim":(255,90,0),  "accent":(255,200,0), "plasma":(255,50,0)},
}

SIRI_WAVES = {
    STATE_IDLE: [
        {"col":(0,150,255),  "amp":0.30,"freq":1.5,"phase":0.0, "y":-0.50,"w":2,"glow":5},
        {"col":(120,0,255),  "amp":0.26,"freq":2.0,"phase":0.8, "y":-0.30,"w":2,"glow":4},
        {"col":(0,220,255),  "amp":0.32,"freq":1.3,"phase":1.6, "y":-0.12,"w":2,"glow":5},
        {"col":(80,0,200),   "amp":0.26,"freq":2.4,"phase":2.4, "y": 0.05,"w":2,"glow":4},
        {"col":(0,180,255),  "amp":0.30,"freq":1.7,"phase":3.2, "y": 0.20,"w":2,"glow":5},
        {"col":(160,0,255),  "amp":0.26,"freq":2.1,"phase":4.0, "y": 0.38,"w":2,"glow":4},
        {"col":(0,200,220),  "amp":0.28,"freq":1.5,"phase":4.8, "y": 0.54,"w":2,"glow":4},
    ],
    STATE_LISTENING: [
        {"col":(0,255,120),  "amp":0.38,"freq":2.5,"phase":0.0, "y":-0.50,"w":2,"glow":6},
        {"col":(0,200,255),  "amp":0.32,"freq":3.0,"phase":0.6, "y":-0.30,"w":2,"glow":5},
        {"col":(50,255,180), "amp":0.40,"freq":2.2,"phase":1.2, "y":-0.12,"w":3,"glow":7},
        {"col":(0,255,200),  "amp":0.34,"freq":3.5,"phase":1.8, "y": 0.05,"w":2,"glow":5},
        {"col":(0,220,255),  "amp":0.38,"freq":2.0,"phase":2.4, "y": 0.20,"w":3,"glow":6},
        {"col":(80,255,200), "amp":0.32,"freq":3.2,"phase":3.0, "y": 0.38,"w":2,"glow":5},
        {"col":(0,255,150),  "amp":0.36,"freq":2.8,"phase":3.6, "y": 0.54,"w":2,"glow":6},
    ],
    STATE_THINKING: [
        {"col":(200,0,255),  "amp":0.28,"freq":1.8,"phase":0.0, "y":-0.50,"w":2,"glow":5},
        {"col":(255,50,180), "amp":0.24,"freq":2.3,"phase":0.9, "y":-0.30,"w":2,"glow":4},
        {"col":(160,0,255),  "amp":0.30,"freq":1.6,"phase":1.8, "y":-0.12,"w":2,"glow":5},
        {"col":(255,0,150),  "amp":0.24,"freq":2.8,"phase":2.7, "y": 0.05,"w":2,"glow":4},
        {"col":(180,0,255),  "amp":0.28,"freq":2.0,"phase":3.6, "y": 0.20,"w":2,"glow":5},
        {"col":(255,80,200), "amp":0.22,"freq":2.5,"phase":4.5, "y": 0.38,"w":2,"glow":4},
        {"col":(200,0,255),  "amp":0.26,"freq":1.9,"phase":5.4, "y": 0.54,"w":2,"glow":4},
    ],
    STATE_SPEAKING: [
        {"col":(255,100,0),  "amp":0.38,"freq":2.8,"phase":0.0, "y":-0.50,"w":2,"glow":6},
        {"col":(255,200,0),  "amp":0.32,"freq":3.5,"phase":0.6, "y":-0.30,"w":2,"glow":5},
        {"col":(255,60,0),   "amp":0.42,"freq":2.5,"phase":1.2, "y":-0.12,"w":3,"glow":7},
        {"col":(255,180,0),  "amp":0.34,"freq":4.0,"phase":1.8, "y": 0.05,"w":2,"glow":5},
        {"col":(255,120,0),  "amp":0.40,"freq":3.0,"phase":2.4, "y": 0.20,"w":3,"glow":6},
        {"col":(255,220,50), "amp":0.30,"freq":3.8,"phase":3.0, "y": 0.38,"w":2,"glow":5},
        {"col":(255,80,0),   "amp":0.36,"freq":2.6,"phase":3.6, "y": 0.54,"w":2,"glow":6},
    ],
}

SPD = {STATE_IDLE:1.0,STATE_LISTENING:4.5,STATE_THINKING:2.5,STATE_SPEAKING:5.5}

class GlobeCanvas:
    SIZE = 280
    CX   = 140
    CY   = 140
    R    = 110

    def __init__(self, parent):
        try:
            from PIL import Image, ImageDraw, ImageTk, ImageChops
            self._PIL = True
        except ImportError:
            self._PIL = False
            print("[Globe] pip install Pillow")
        self.canvas = tk.Canvas(parent, width=self.SIZE, height=self.SIZE,
                                bg="#000000", highlightthickness=0)
        self.state  = STATE_IDLE
        self.t      = 0.0
        self._photo = None
        self._ft    = time.time()
        self._fc    = 0; self._fps=60; self._tick=16
        self._draw()

    def pack(self,**kw): self.canvas.pack(**kw)
    def place(self,**kw): self.canvas.place(**kw)
    def set_state(self,s): self.state=s

    def _fps_update(self):
        self._fc+=1
        now=time.time()
        if now-self._ft>=1.0:
            self._fps=max(10,min(30,self._fc))
            self._fc=0;self._ft=now
            self._tick=max(16,int(1000/max(self._fps,30)))

    def _draw(self):
        self._fps_update()
        if self._PIL:
            try: self._draw_pil()
            except Exception as e: print(f"[Draw]{e}")
        else: self._draw_fallback()
        self.t+=0.038
        self.canvas.after(self._tick,self._draw)

    def _draw_pil(self):
        from PIL import Image, ImageDraw, ImageTk, ImageChops
        S=self.SIZE; cx=self.CX; cy=self.CY; R=self.R; t=self.t
        pal=STATE_PALETTES[self.state]
        waves=SIRI_WAVES[self.state]
        spd=SPD[self.state]

        img=Image.new("RGBA",(S,S),(0,0,0,0))

        mask=Image.new("L",(S,S),0)
        ImageDraw.Draw(mask).ellipse([cx-R,cy-R,cx+R,cy+R],fill=255)

        bg=Image.new("RGBA",(S,S),(0,0,0,0))
        ImageDraw.Draw(bg).ellipse([cx-R,cy-R,cx+R,cy+R],fill=(5,10,38,255))
        bg.putalpha(mask)
        img.alpha_composite(bg)

        wlayer=Image.new("RGBA",(S,S),(0,0,0,0))
        wdraw=ImageDraw.Draw(wlayer)

        for wv in waves:
            col  = wv["col"]
            amp  = int(R*wv["amp"])
            freq = wv["freq"]
            phase= wv["phase"]
            yoff = int(R*wv["y"])
            lw   = wv["w"]
            gw   = wv["glow"]

            pts=[]
            for si in range(200):
                nx=si/199
                x =int(cx-R*0.96+nx*R*1.92)

                env=math.sin(nx*math.pi)**0.6
                y =cy+yoff+int(env*amp*(
                    math.sin(nx*math.pi*freq    +t*spd+phase     )*0.65+
                    math.sin(nx*math.pi*freq*1.7+t*spd*1.4+phase+1.1)*0.25+
                    math.sin(nx*math.pi*freq*2.9+t*spd*0.6+phase+2.3)*0.10
                ))
                pts.append((x,y))

            pulse=0.6+0.4*abs(math.sin(t*1.2+phase))

            wdraw.line(pts,fill=(*_a(col,0.15*pulse),int(60*pulse)),width=gw+4)

            wdraw.line(pts,fill=(*_a(col,0.35*pulse),int(120*pulse)),width=gw)
  
            wdraw.line(pts,fill=(*col,int(220*pulse)),width=lw)

        r2,g2,b2,a2=wlayer.split()
        a2=ImageChops.multiply(a2,mask)
        wlayer=Image.merge("RGBA",(r2,g2,b2,a2))
        img.alpha_composite(wlayer)

        draw=ImageDraw.Draw(img)

        rim=pal["rim"]
        for w,alp in [(10,0.06),(7,0.14),(5,0.30),(3,0.60),(2,0.85),(1,1.0)]:
            draw.ellipse([cx-R,cy-R,cx+R,cy+R],
                         outline=(*_a(rim,alp),255),width=w)

        shine=Image.new("RGBA",(S,S),(0,0,0,0))
        shd=ImageDraw.Draw(shine)
        hx=cx-int(R*0.32); hy=cy-int(R*0.34)
        shd.ellipse([hx-int(R*0.22),hy-int(R*0.22),
                     hx+int(R*0.22),hy+int(R*0.22)],fill=(255,255,255,16))
        shd.ellipse([hx-int(R*0.12),hy-int(R*0.12),
                     hx+int(R*0.12),hy+int(R*0.12)],fill=(255,255,255,28))
        shd.ellipse([hx-int(R*0.05),hy-int(R*0.05),
                     hx+int(R*0.05),hy+int(R*0.05)],fill=(255,255,255,50))
        sr,sg,sb,sa=shine.split()
        sa=ImageChops.multiply(sa,mask)
        shine=Image.merge("RGBA",(sr,sg,sb,sa))
        img.alpha_composite(shine)

        self._photo=ImageTk.PhotoImage(img)
        self.canvas.delete("all")
        self.canvas.create_image(0,0,anchor="nw",image=self._photo)

    def _draw_fallback(self):
        self.canvas.delete("all")
        cx=self.CX;cy=self.CY;R=self.R;pal=STATE_PALETTES[self.state]
        for i in range(16,0,-1):
            frac=i/16;r2=int(R*frac);c=_b(pal["core"],pal["mid"],frac)
            self.canvas.create_oval(cx-r2,cy-r2,cx+r2,cy+r2,fill=rgb2hex(*c),outline="")
        self.canvas.create_oval(cx-R,cy-R,cx+R,cy+R,
                                outline=rgb2hex(*pal["rim"]),width=3,fill="")

class AthenaApp:
    S = 280

    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Athena")

        self.root.overrideredirect(True)
        self.root.attributes("-topmost", True)
        self.root.attributes("-transparentcolor", "#000000")
        self.root.configure(bg="#000000")
        self.root.resizable(False, False)

        sw = self.root.winfo_screenwidth()
        sh = self.root.winfo_screenheight()
        x  = (sw - self.S) // 2
        y  = sh - self.S - 60    
        self.root.geometry(f"{self.S}x{self.S}+{x}+{y}")
        self._home_x = x
        self._home_y = y

        self._dx = self._dy = 0
        self.root.bind("<ButtonPress-1>",   self._drag_start)
        self.root.bind("<B1-Motion>",       self._drag_move)
        self.root.bind("<space>",           lambda e: self._wake())
        self.root.bind("<Escape>",          lambda e: self._quit())
        self.root.bind("<s>",               lambda e: (stop_speech(), dismiss_alarm()))
        self.root.bind("<Double-Button-1>", lambda e: self._quit())

        self.state     = STATE_IDLE
        self._is_small = False
        self.history   = load_memory()
        self.auth      = load_auth()
        self.user_name = self.auth.get("user", "Sir")
        self.eq        = queue.Queue()

        self._build_ui()

        threading.Thread(target=self._wake_thread, daemon=True).start()
        threading.Thread(target=self._eq_loop, daemon=True).start()

        self.root.mainloop()

    def _build_ui(self):

        self.globe = GlobeCanvas(self.root)
        self.globe.place(x=0, y=0)

        self._status  = tk.Label(self.root, text="", bg="#000", fg="#000", font=("Courier",1))
        self._status.place(x=0, y=0)
        self._lbl     = tk.Label(self.root, text="", bg="#000", fg="#000", font=("Courier",1))
        self._lbl.place(x=0, y=0)
        self._bars    = []
        self._bar_t   = 0.0
        self._animate_bars()

    STATUS_TXT = {
        STATE_IDLE:      "[ STANDBY — PRESS SPACE ]",
        STATE_LISTENING: "[ LISTENING ... ]",
        STATE_THINKING:  "[ PROCESSING ... ]",
        STATE_SPEAKING:  "[ SPEAKING ]",
    }
    STATUS_COL = {
        STATE_IDLE:      "#1a4a8a",
        STATE_LISTENING: "#00ff88",
        STATE_THINKING:  "#bf00ff",
        STATE_SPEAKING:  "#ff6600",
    }

    def _animate_bars(self):
        self._bar_t += 0.14
        self.root.after(100, self._animate_bars)

    def _set_state(self, s):
        self.state = s
        self.globe.set_state(s)
        if s == STATE_IDLE:

            self.root.after(3000, self._shrink)
        else:
            self._expand()

    def _shrink(self):
        if self.state != STATE_IDLE: return

        sw = self.root.winfo_screenwidth()
        sh = self.root.winfo_screenheight()
        xs = (sw - 60) // 2
        ys = sh - 80
        self.root.geometry(f"60x60+{xs}+{ys}")
        self.globe.canvas.config(width=60, height=60)
        self._is_small = True

    def _expand(self):
        if not getattr(self, "_is_small", False): return
        self._is_small = False
        self.root.geometry(f"{self.S}x{self.S}+{self._home_x}+{self._home_y}")
        self.globe.canvas.config(width=self.S, height=self.S)

    def _drag_start(self, e): self._dx=e.x; self._dy=e.y
    def _drag_move(self, e):
        self.root.geometry(
            f"+{self.root.winfo_x()+e.x-self._dx}+{self.root.winfo_y()+e.y-self._dy}"
        )

    def _wake(self):
        if self.state != STATE_IDLE: return
        self._expand()
        self._is_small = False
        self.root.geometry(f"{self.S}x{self.S}+{self._home_x}+{self._home_y}")
        self.globe.canvas.config(width=self.S, height=self.S)
        self.eq.put({"type":"state","value":STATE_LISTENING})
        threading.Thread(target=self._turn, daemon=True).start()

    def _turn(self):
        txt = listen_once(8)
        if not txt:
            self.eq.put({"type": "state", "value": STATE_IDLE}); return
        print(f"[User] {txt}")

        stop_words = ["stop", "quiet", "shut up", "pause", "chup", "ruko", "bas", "band karo", "dismiss", "snooze", "cancel alarm"]
        if any(w in txt.lower() for w in stop_words):
            stop_speech()
            dismiss_alarm()
            self.root.after(0, self._set_state, STATE_IDLE)
            print("[Athena] Stopped and alarm dismissed.")
            return

        self.eq.put({"type": "state", "value": STATE_THINKING})
        self.history.append({"role": "user", "content": txt})
        reply = query_llm(txt, self.history, self.user_name)
        print(f"[Athena] {reply}")
        self.history.append({"role": "assistant", "content": reply})
        save_memory(self.history)
        self.eq.put({"type": "reply", "text": reply})

    def _speak_bg(self, text):
        self._set_state(STATE_SPEAKING)
        speak_text(text)
        if self.state == STATE_SPEAKING:
            self._set_state(STATE_IDLE)

    def _eq_loop(self):
        while True:
            try:
                ev = self.eq.get(timeout=0.5)
                if ev["type"] == "state":
                    self.root.after(0, self._set_state, ev["value"])
                elif ev["type"] == "reply":
                    text = ev["text"]
                    def _launch(t=text):
                        threading.Thread(target=self._speak_bg, args=(t,), daemon=True).start()
                    self.root.after(0, _launch)
            except queue.Empty:
                pass

    def _wake_thread(self):
        global _wake_active
        if not SR_OK:
            print("[Wake] SpeechRecognition not installed.")
            return

        WAKE_WORDS = ["hey athena","athena","hi athena","ok athena",
                      "wake up","hello athena","aye athena","hey elena"]

        print("[Wake] Always listening for 'Hey Athena'...")
        rec = sr.Recognizer()
        rec.energy_threshold         = 200
        rec.dynamic_energy_threshold = True
        rec.pause_threshold          = 0.5

        def callback(recognizer, audio):
            global _wake_active
            if not _wake_active or _cmd_mode:
                return
            try:
                txt = recognizer.recognize_google(audio).lower()
                print(f"[Wake heard] {txt}")
                if any(w in txt for w in WAKE_WORDS):
                    print(f"[Wake] Triggered by: '{txt}'")
                    self.root.after(0, self._wake)
            except sr.UnknownValueError:
                pass
            except sr.RequestError as e:
                print(f"[Wake API error] {e}")
            except Exception as e:
                print(f"[Wake error] {e}")

        try:
            with sr.Microphone() as src:
                rec.adjust_for_ambient_noise(src, duration=1.0)
                print(f"[Wake] Energy threshold set to {rec.energy_threshold:.0f}")

            stop_fn = rec.listen_in_background(
                sr.Microphone(),
                callback,
                phrase_time_limit=4
            )
            print("[Wake] Background listener active — say 'Hey Athena'")

            while True:
                time.sleep(0.5)

        except Exception as e:
            print(f"[Wake] Failed to start background listener: {e}")
            print("[Wake] Falling back to polling mode...")
            
            while True:
                if not _wake_active or _cmd_mode:
                    time.sleep(0.5)
                    continue
                try:
                    with sr.Microphone() as src:
                        rec.adjust_for_ambient_noise(src, duration=0.2)
                        audio = rec.listen(src, timeout=3, phrase_time_limit=4)
                    txt = rec.recognize_google(audio).lower()
                    print(f"[Wake poll] {txt}")
                    if any(w in txt for w in WAKE_WORDS):
                        self.root.after(0, self._wake)
                except sr.WaitTimeoutError:
                    pass
                except sr.UnknownValueError:
                    pass
                except Exception as e:
                    time.sleep(1)

    def _quit(self):
        save_memory(self.history)
        self.root.destroy()

def first_run():
    w = tk.Tk()
    w.title("Athena Setup"); w.geometry("340x200")
    w.configure(bg="#000"); w.resizable(False, False)
    tk.Label(w, text="Welcome to ATHENA", bg="#000", fg="#00e5ff",
             font=("Courier", 14, "bold")).pack(pady=(20,4))
    tk.Label(w, text="What should I call you?", bg="#000", fg="#4488ff",
             font=("Courier", 9)).pack()
    v = tk.StringVar()
    e = tk.Entry(w, textvariable=v, bg="#0a1a3a", fg="#00e5ff",
                 insertbackground="#00e5ff", font=("Courier", 13),
                 relief="flat", bd=0, highlightthickness=1,
                 highlightcolor="#004455", highlightbackground="#002233", width=20)
    e.pack(pady=16, ipady=6); e.focus()
    def ok(ev=None):
        save_auth(v.get().strip() or "Sir"); w.destroy()
    tk.Button(w, text="LET'S GO →", command=ok, bg="#002233", fg="#00e5ff",
              activebackground="#004455", activeforeground="#00e5ff",
              font=("Courier", 10, "bold"), relief="flat", bd=0,
              padx=20, pady=6, cursor="hand2").pack()
    e.bind("<Return>", ok); w.mainloop()

if __name__ == "__main__":
    if not AUTH_PATH.exists():
        first_run()
    print("=" * 52)
    print("  ATHENA v2.1 — Weather + GPT + App Launch")
    print("  Space=wake · Esc=quit · Drag=move")
    print("  APIs: GROQ | OPENAI | OPENWEATHER")
    print("=" * 52)
    AthenaApp()