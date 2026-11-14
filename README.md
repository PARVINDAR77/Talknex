# TalkNex — Autonomous AI Voice SaaS Platform

TalkNex is an enterprise-grade Autonomous AI Voice Agent SaaS platform designed to automate inbound customer service, outbound lead qualification, appointment booking, and debt collection with sub-500ms latency across Telephony (VoIP/SIP), WhatsApp Voice, and SMS in native Hindi, English, Hinglish, and Gujarati.

---

## 🌟 Key Features

- **⚡ Sub-500ms Conversational Latency**: Near-zero delay turn-taking powered by Groq Llama 3.3 70B.
- **🎙️ Real-time Audio Intelligence**: Continuous RMS voice activity detection (VAD) with Groq Whisper Turbo (`whisper-large-v3-turbo`) for high-accuracy multilingual speech-to-text.
- **📞 Native Phone Call Experience**: Interactive floating voice call screen with live waveform visualizer, pulsing audio rings, mute controls, and real-time dialogue transcripts.
- **🌐 Omnichannel Ready**: Engineered to integrate with SIP trunks, Twilio, Exotel, and WhatsApp Voice APIs.
- **🏢 Enterprise Multi-Tenant Architecture**: RBAC for Candidate/User and Super Admin with role-based routing and analytics dashboards.

---

## 🏗️ Repository Architecture

This repository is organized as an npm workspace monorepo:

```text
Talknex/
├── apps/
│   ├── web/                    # Next.js 15 (App Router), React 19, Tailwind CSS frontend
│   └── api/                    # NestJS 11 backend API, Prisma ORM, BullMQ job queues
├── packages/
│   ├── contracts/              # Shared API contract interfaces & DTOs
│   ├── shared/                 # Core shared utilities, constants, types
│   ├── config/                 # Shared environment & lint configuration
│   └── validation/             # Shared runtime schema validation
├── groq-voice-assistant/       # Standalone Groq-powered reference engine & prototypes
├── package.json                # Monorepo workspaces configuration
└── README.md
```

---

## 🚀 Quickstart

### Prerequisites
- Node.js >= 20.0.0
- npm >= 10.0.0

### 1. Installation
Clone the repository and install workspace dependencies:
```bash
git clone https://github.com/PARVINDAR77/Talknex.git
cd Talknex
npm install
```

### 2. Environment Configuration
Create `.env` inside `apps/web`:
```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_WHISPER_MODEL=whisper-large-v3-turbo
```

### 3. Run Development Servers
Start the web application:
```bash
npm --workspace=@talknex/web run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing Voice AI
1. Click **"Talk to TalkNex AI"** in the bottom-right corner of the website.
2. The phone call interface connects automatically.
3. Speak naturally in Hindi, English, or Hinglish to ask about TalkNex features, deployment, or pricing plans.

---

## 📄 License
MIT License © 2026 TalkNex Inc.
