# ATHENA - AI Voice Assistant

> A next-gen AI desktop voice assistant with a Siri-style animated globe UI, neural voice, and full desktop control.

---

## Features

- 🎤 **Wake Word Detection** — Say "Hey Athena" to activate, no button needed
- 🌊 **Siri-Style Animated Globe** — Fluid wave animation that reacts to each state
- 🗣️ **Neural TTS Voice** — Microsoft Aria Neural voice (human-like, not robotic)
- 🌦️ **Live Weather** — Real-time weather via Open-Meteo (no API key needed)
- 📱 **App Launcher** — Open any app by voice
- 📁 **File & Folder Control** — Open, search folders by voice
- ⏰ **Smart Alarms** — Keeps ringing until you say stop, with custom messages
- 🔔 **Reminders** — Set reminders by voice for any time in minutes
- 📄 **Document Writer** — Writes letters/emails and opens in Chrome with download button
- 🧠 **Conversation Memory** — Remembers your past conversations
- 🌐 **Transparent Floating UI** — Lives near your taskbar, expands on wake

---

## Setup

```bash
pip install -r requirements.txt
cp .env.template .env
# Add your API keys to .env
python athena.py
```

---

## API Keys

| Key | Required | Get it |
|-----|----------|--------|
| `GROQ_API_KEY` | ✅ Yes | [console.groq.com](https://console.groq.com/keys) — Free |
| `OPENAI_API_KEY` | ❌ Optional | [platform.openai.com](https://platform.openai.com/api-keys) — Fallback LLM |
| `OPENWEATHER_API_KEY` | ❌ Optional | Uses Open-Meteo by default — no key needed |

---

## Voice Commands

### 🔊 Wake
```
"Hey Athena"
"Hi Athena"
"Ok Athena"
"Hello Athena"
```

### 📱 Open Apps
```
"Hey Athena, open Chrome"
"Hey Athena, open Spotify"
"Hey Athena, open VS Code"
"Hey Athena, open Notepad"
"Hey Athena, open Discord"
"Hey Athena, open Calculator"
```

### 📁 Files & Folders
```
"Hey Athena, open my Documents folder"
"Hey Athena, open Downloads"
"Hey Athena, search for report in my Downloads"
"Hey Athena, search for resume in Documents"
```

### ⏰ Alarms
```
"Hey Athena, set an alarm for 7:30 AM, say Good morning Sir"
"Hey Athena, wake me up at 6:00"
"Hey Athena, set alarm for 9:00 with message time to study"
```
> Say **"Stop"** or **"Bas"** to dismiss the alarm

### 🔔 Reminders
```
"Hey Athena, remind me to call John in 10 minutes"
"Hey Athena, remind me to drink water in 30 minutes"
"Hey Athena, remind me to take medicine in 5 minutes"
"Hey Athena, remind me about the meeting in 15 minutes"
```

### 🌦️ Weather
```
"Hey Athena, what's the weather in Vadodara?"
"Hey Athena, what is the temperature in Mumbai?"
"Hey Athena, how is the weather in Delhi today?"
```

### 📄 Documents & Letters
```
"Hey Athena, write a leave application letter"
"Hey Athena, write a formal email to my manager"
"Hey Athena, write a message: Hi team, meeting at 3pm"
"Hey Athena, write an apology letter"
```
> Say **"Download it"** or **"Save the file"** to save to Desktop

### 🕐 Time & Date
```
"Hey Athena, what time is it?"
"Hey Athena, what is today's date?"
"Hey Athena, what day is it?"
```

### 💬 General Conversation
```
"Hey Athena, who is Elon Musk?"
"Hey Athena, tell me a joke"
"Hey Athena, what is machine learning?"
"Hey Athena, help me write a Python function"
```

### 🛑 Stop / Control
```
"Stop"         → Stop speaking immediately
"Chup"         → Stop (Hindi)
"Bas"          → Stop (Hindi)
"Dismiss"      → Dismiss alarm
Press S key    → Stop speaking
Press Esc      → Quit Athena
```

---

## Controls

| Key | Action |
|-----|--------|
| Say **"Hey Athena"** | Wake up 🎤 |
| `Space` | Wake (manual) |
| `S` | Stop speaking 🛑 |
| `Esc` | Quit ❌ |
| `Drag` | Move globe anywhere |
| `Double-click` | Quit ❌ |

---

## Project Structure

```
athena/
├── athena.py          # Main application
├── requirements.txt   # Dependencies
├── .env.template      # API keys template
├── README.md          # This file
└── venv/              # Virtual environment (not uploaded)
```

---

## Requirements

```
groq
openai
speechrecognition
pyaudio
pyttsx3
edge-tts
pygame
Pillow
python-dotenv
pyautogui
pyperclip
```

---

## Mentors

- **Himani Parmar**
- **Ravi**

---

## Developer

**Saksham Sethi** — Final Year Project, Parul University

---

## Team Mates

- **Mahimal**
- **Nisarg**
---

*Built with ❤️ using Python, Groq LLaMA 3.3, Microsoft Azure Neural TTS, Open-Meteo API*