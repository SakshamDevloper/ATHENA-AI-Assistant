# 🔵 ATHENA — AI Voice Assistant

> *"Hey Athena"* — Your intelligent, floating desktop companion.

A **Python desktop AI Voice Assistant** built as a final year project at Parul University.  
Cross-platform · Frameless floating globe UI · GPT-4o powered · Voice-authenticated · Memory-enabled.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎙️ **Wake Word** | Say *"Hey Athena"* to activate (powered by Porcupine) |
| 🌐 **Floating Globe UI** | Animated holographic orb — idle, listening, thinking, speaking states |
| 🧠 **GPT-4o Brain** | Full conversational AI with natural language understanding |
| 💾 **Persistent Memory** | Remembers past conversations across sessions |
| 🔐 **Voice Auth** | First-run user registration; voice-locked to owner |
| 📂 **File Control** | Open apps, folders, search inside directories by voice |
| ⏰ **Smart Alarm** | Spoken alarm — *"Good morning, Sir — time is up"* |
| ✉️ **Voice-to-Text** | Dictate messages hands-free |
| 🌍 **Cross-Platform** | Windows · macOS · Linux |

---

## 🚀 Quick Start

### 1. Clone
```bash
git clone https://github.com/YOUR_USERNAME/athena-voice-assistant.git
cd athena-voice-assistant
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

> **macOS/Linux PyAudio note:**
> ```bash
> # macOS:  brew install portaudio && pip install pyaudio
> # Ubuntu: sudo apt install portaudio19-dev && pip install pyaudio
> ```

### 3. Set up API keys
Create a `.env` file in the project root:
```env
OPENAI_API_KEY=sk-...
PORCUPINE_ACCESS_KEY=...   # Free at picovoice.ai
```

### 4. Run!
```bash
python athena_globe.py
```

On first launch, Athena will ask your name for personalization.  
Then the floating globe will appear — **drag it anywhere on screen**.

---

## 🎮 Controls

| Action | Control |
|---|---|
| Wake Athena | Say *"Hey Athena"* OR press **Space** |
| Quit | Press **Esc** OR **double-click** the globe |
| Move | **Click & drag** anywhere on the window |

---

## 🗣️ Example Voice Commands

```
"Hey Athena, open Chrome"
"Hey Athena, open my Documents folder"
"Hey Athena, search for report in my Downloads"
"Hey Athena, set an alarm for 7:30 AM, say Good morning Sir"
"Hey Athena, what's the weather in Vadodara?"
"Hey Athena, write a message: Hi team, meeting at 3pm"
```

---

## 🏗️ Architecture

```
athena_globe.py
│
├── AthenaGlobe          ← Tkinter floating globe UI (30fps animation)
│   ├── States           ← idle · listening · thinking · speaking
│   ├── Animation loop   ← breathing core, spinning rings, waveform bars
│   └── Event queue      ← thread-safe UI updates
│
├── Wake word thread     ← pvporcupine (background listener)
├── Conversation turn    ← listen → LLM → speak pipeline
│
├── query_llm()          ← GPT-4o with memory + command routing
├── speak_text()         ← pyttsx3 TTS
├── listen_once()        ← Google STT via speechrecognition
│
├── System Commands      ← open_app · open_folder · search_folder · set_alarm
└── Memory               ← ~/.athena_memory.json  (last 40 exchanges)
```

---

## 🔒 Security & Privacy

- **Voice authentication** — user registered on first run; name stored in `~/.athena_auth.json`
- **Local memory** — conversation history stays on your machine (`~/.athena_memory.json`)
- **No cloud audio storage** — audio is processed locally via Google STT (online) or can be replaced with Whisper (offline)
- **API keys** — stored in `.env`, never committed to git (see `.gitignore`)

---

## 🗺️ Roadmap (Next Steps)

- [ ] **Step 2** — Wake word engine + voice fingerprint authentication
- [ ] **Step 3** — Smart alarm with spoken messages
- [ ] **Step 4** — File & app control engine
- [ ] **Step 5** — Web search integration
- [ ] **Step 6** — Offline mode (Whisper STT + local LLM)
- [ ] **Step 7** — Multi-language support (Hindi, Gujarati)
- [ ] **Step 8** — System tray integration

---

## 👥 Team

| Name | Roll No |
|---|---|
| Mahiman Joshi | 2403031087033 |
| Saksham Sethi | 2403031087123 |
| Nisarg Patel  | 2403031087153 |

**Guided by:** Prof. Himani Parmar, Assistant Professor (IT Dept), Parul University

---

## 📄 License

MIT License — free to use, modify, and share with attribution.
