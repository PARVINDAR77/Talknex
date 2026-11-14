# VOX — Studio-Grade AI Voice Assistant (Groq + Neural TTS)

A standalone multilingual voice assistant delivering ultra-fast, human-like voice conversations using:

- **Frontend**: HTML5, CSS3 3D Animated Avatar, and Vanilla JavaScript (zero bundle overhead)
- **Backend Proxy**: Node.js 22 (ESM) + Express with rate limiting and helmet security
- **LLM Engine**: Groq Chat Completions API (`openai/gpt-oss-20b`) with **real-time token streaming**
- **Speech-to-Text (STT)**: 
  - **Groq Whisper Turbo (`whisper-large-v3-turbo`)**: ~300ms server-side multilingual transcription for Hindi, English, and code-switched Hinglish.
  - **Browser Web Speech API**: Client-side speech recognition fallback.
- **Text-to-Speech (TTS)**:
  - **💎 Microsoft Edge Neural Voices (`msedge-tts`)**: 100% Free, zero-API-key studio neural speech (`hi-IN-SwaraNeural`, `hi-IN-MadhurNeural`, `en-IN-NeerjaNeural`, `en-IN-PrabhatNeural`, `en-US-JennyNeural`).
  - **Sentence-Chunked Streaming Playback**: Parallel audio prefetching allows the assistant to start speaking out loud in **~300ms** with zero audible gaps between sentences.
  - **Browser SpeechSynthesis**: Local OS voice fallback.

---

## Requirements

- Node.js 20 or newer (tested on Node v22.14)
- npm
- A Groq API key (free tier supported)
- Any modern browser (Chrome, Edge, Brave, Safari)

---

## Quick Setup

1. Open a terminal in the `groq-voice-assistant` directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Ensure `.env` contains your Groq API key:

   ```env
   GROQ_API_KEY=gsk_your_real_key
   GROQ_MODEL=openai/gpt-oss-20b
   GROQ_WHISPER_MODEL=whisper-large-v3-turbo
   PORT=3000
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser and allow microphone permissions.

---

## API Endpoints

### 1. `GET /api/health`
Returns configuration, provider health, and active models.

### 2. `POST /api/chat`
* Payload: `{ messages: [...], stream: true }`
* Response: Server-Sent Events (`text/event-stream`) streaming `reasoning` and `token` events.

### 3. `POST /api/transcribe`
* Payload: Raw audio binary blob (`audio/webm`, `audio/wav`, `audio/mp4`).
* Response: `{ text: "Transcribed speech", model: "whisper-large-v3-turbo" }`.

### 4. `POST /api/tts`
* Payload: `{ text: "...", gender: "female"|"male", language: "hi-IN"|"en-IN"|"auto", speed: 0.95 }`
* Response: `audio/mpeg` (24kHz MP3 audio buffer from Microsoft Neural Speech).
