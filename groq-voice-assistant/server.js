import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
const GROQ_WHISPER_MODEL = process.env.GROQ_WHISPER_MODEL || "whisper-large-v3-turbo";
const MAX_HISTORY_MESSAGES = Math.max(4, Math.min(40, Number(process.env.MAX_HISTORY_MESSAGES || 18)));

app.disable("x-powered-by");
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'"],
      mediaSrc: ["'self'", "blob:"],
      objectSrc: ["'none'"],
      frameAncestors: ["*"]
    }
  },
  frameguard: false
}));

// Raw buffer parser for audio transcription uploads
app.use("/api/transcribe", express.raw({ type: ["audio/*", "application/octet-stream"], limit: "25mb" }));
app.use(express.json({ limit: "32kb" }));

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests. Please wait a moment and try again." }
});

const transcribeLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many transcription requests. Please wait a moment and try again." }
});

const ttsLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 150,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many speech synthesis requests. Please slow down." }
});

const SYSTEM_PROMPT = `You are Swara, an ultra-fast, friendly female voice AI agent on a real-time phone call.
You fluently understand and speak Hindi, English, Hinglish, and Urdu.
Always reply naturally in the same language style the user used:
- If the user speaks Hinglish, reply in warm, modern Hinglish (using Roman English text).
- If the user speaks Hindi, reply in conversational Hindi.
- If the user speaks English, reply in natural English.
- If the user interrupts you or tells you to stop, wait, listen, or hold on (e.g. "stop", "wait", "suno", "ruko", "hold on"), immediately acknowledge in 1 brief phrase (e.g. "Haan boliye, sun rahi hoon!", "Sure, I'm listening!", "Boliye kya hua?") and wait for them.
CRITICAL FOR PHONE CALLS: Keep answers brief, punchy, and human (1 to 2 short sentences max).
Never use markdown tables, headings, asterisks (*), URLs, or numbered lists.
Sound energetic, attentive, and natural, exactly like a real person on a fast voice call.`;

function selectEdgeVoice({ gender = "female", language = "auto", text = "" }) {
  const hasArabicUrdu = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);

  // Urdu / Perso-Arabic script
  if (hasArabicUrdu) {
    return "ur-IN-GulNeural";
  }
  // Default natural female neural voice for Hindi, Hinglish, and English
  return "hi-IN-SwaraNeural";
}

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    provider: "groq",
    configured: Boolean(GROQ_API_KEY),
    model: GROQ_MODEL,
    whisperModel: GROQ_WHISPER_MODEL,
    neuralTTS: "msedge-tts (Microsoft Azure Neural)"
  });
});

app.post("/api/tts", ttsLimiter, async (req, res) => {
  const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";
  if (!text || !/[a-zA-Z0-9\u0900-\u097F\u0600-\u06FF]/.test(text)) {
    return res.status(400).json({ error: "Missing speakable text." });
  }

  const gender = "female";
  const language = req.body?.language || "auto";
  const speed = Math.max(0.75, Math.min(1.4, Number(req.body?.speed || 1.20)));
  const voice = selectEdgeVoice({ gender, language, text });

  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    const pct = Math.round((speed - 1) * 100);
    const rateOption = pct >= 0 ? `+${pct}%` : `${pct}%`;

    const { audioStream } = tts.toStream(text, { rate: rateOption });
    const chunks = [];

    audioStream.on("data", (chunk) => chunks.push(chunk));

    audioStream.on("end", () => {
      const audioBuffer = Buffer.concat(chunks);
      if (audioBuffer.length === 0) {
        console.warn(`TTS voice ${voice} returned 0 bytes for text: "${text.slice(0, 30)}..."`);
        return res.status(502).json({ error: "TTS voice returned empty audio." });
      }

      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Length", audioBuffer.length);
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("X-Voice-Used", voice);
      res.end(audioBuffer);
    });

    audioStream.on("error", (err) => {
      console.error("Audio stream error:", err);
      if (!res.headersSent) {
        res.status(502).json({ error: "TTS generation error." });
      }
    });

  } catch (err) {
    console.error("TTS endpoint error:", err?.message || err);
    if (!res.headersSent) {
      return res.status(502).json({ error: "Failed to generate neural speech." });
    }
  }
});

app.post("/api/transcribe", transcribeLimiter, async (req, res) => {
  if (!GROQ_API_KEY || GROQ_API_KEY.includes("replace_this")) {
    return res.status(503).json({
      error: "Groq API key is not configured. Add GROQ_API_KEY to your .env file and restart the server."
    });
  }

  const audioBuffer = req.body;
  if (!audioBuffer || !Buffer.isBuffer(audioBuffer) || audioBuffer.length === 0) {
    return res.status(400).json({ error: "No audio data received." });
  }

  // Audio must have enough bytes to be a meaningful recording
  if (audioBuffer.length < 800) {
    return res.json({ text: "", warning: "Audio too short." });
  }

  const rawContentType = req.headers["content-type"] || "audio/webm";
  const contentType = rawContentType.split(";")[0].trim();
  const ext = contentType.includes("wav") ? "wav" : contentType.includes("mp4") ? "mp4" : contentType.includes("ogg") ? "ogg" : "webm";
  const languageHint = req.headers["x-language"] || "";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    const form = new FormData();
    const file = new File([audioBuffer], `recording.${ext}`, { type: contentType });
    form.append("file", file);
    form.append("model", GROQ_WHISPER_MODEL);
    form.append("response_format", "json");
    form.append("prompt", "Bilingual voice assistant conversation in Hindi, English, and Hinglish.");
    if (languageHint && languageHint.length === 2) {
      form.append("language", languageHint);
    }

    let groqRes;
    try {
      groqRes = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: form,
        signal: controller.signal
      });
    } finally {
      clearTimeout(timeout);
    }

    const payload = await groqRes.json().catch(() => ({}));

    if (!groqRes.ok) {
      const msg = payload?.error?.message || "Transcription failed.";
      console.warn("Groq transcribe warning:", msg);
      // Gracefully handle malformed audio clips without throwing scary technical toasts
      if (msg.includes("could not process file") || msg.includes("invalid_media_file")) {
        return res.json({ text: "", warning: "Could not decode audio, please speak again." });
      }
      const status = groqRes.status === 429 ? 429 : 502;
      return res.status(status).json({ error: msg });
    }

    const text = (payload?.text || "").trim();
    return res.json({ text, model: GROQ_WHISPER_MODEL });
  } catch (err) {
    const isTimeout = err?.name === "AbortError";
    console.error("Transcribe error:", err?.message || err);
    return res.status(isTimeout ? 504 : 502).json({
      error: isTimeout ? "Audio transcription timed out. Please try again." : "Transcription service unavailable."
    });
  }
});

app.post("/api/chat", chatLimiter, async (req, res) => {
  if (!GROQ_API_KEY || GROQ_API_KEY.includes("replace_this")) {
    return res.status(503).json({
      error: "Groq API key is not configured. Add GROQ_API_KEY to your .env file and restart the server."
    });
  }

  const incoming = req.body?.messages;
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return res.status(400).json({ error: "A non-empty messages array is required." });
  }

  const allowed = incoming.slice(-MAX_HISTORY_MESSAGES).map((message) => {
    const role = message?.role;
    const content = typeof message?.content === "string" ? message.content.trim() : "";
    if (!["user", "assistant"].includes(role) || !content || content.length > 6000) {
      return null;
    }
    return { role, content };
  });

  if (allowed.some((item) => item === null) || !allowed.some((item) => item.role === "user")) {
    return res.status(400).json({ error: "Invalid conversation message. Check roles and message content." });
  }

  const wantStream = req.body?.stream !== false;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 35000);

    if (wantStream) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      res.flushHeaders?.();

      req.on("close", () => {
        controller.abort();
      });

      let groqResponse;
      try {
        groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...allowed],
            temperature: 0.6,
            max_completion_tokens: 450,
            stream: true
          }),
          signal: controller.signal
        });
      } catch (err) {
        clearTimeout(timeout);
        const isTimeout = err?.name === "AbortError";
        res.write(`event: error\ndata: ${JSON.stringify({ error: isTimeout ? "The AI response timed out." : "Unable to reach Groq right now." })}\n\n`);
        return res.end();
      }

      if (!groqResponse.ok) {
        clearTimeout(timeout);
        const payload = await groqResponse.json().catch(() => ({}));
        const providerMessage = payload?.error?.message || "Groq request failed.";
        res.write(`event: error\ndata: ${JSON.stringify({ error: providerMessage })}\n\n`);
        return res.end();
      }

      const reader = groqResponse.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop();

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data:")) continue;
            if (trimmed === "data: [DONE]") {
              res.write("event: done\ndata: {}\n\n");
              continue;
            }
            try {
              const parsed = JSON.parse(trimmed.slice(5).trim());
              const delta = parsed.choices?.[0]?.delta || {};
              if (delta.reasoning) {
                res.write(`event: reasoning\ndata: ${JSON.stringify({ type: "reasoning", text: delta.reasoning })}\n\n`);
              }
              if (delta.content) {
                res.write(`event: token\ndata: ${JSON.stringify({ type: "token", text: delta.content })}\n\n`);
              }
            } catch {}
          }
        }
      } catch (streamErr) {
        if (streamErr?.name !== "AbortError") {
          console.error("Stream error:", streamErr);
          res.write(`event: error\ndata: ${JSON.stringify({ error: "Stream interrupted." })}\n\n`);
        }
      } finally {
        clearTimeout(timeout);
        res.end();
      }
      return;
    }

    // Non-streaming fallback
    let groqResponse;
    try {
      groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...allowed],
          temperature: 0.6,
          max_completion_tokens: 450,
          stream: false
        }),
        signal: controller.signal
      });
    } finally {
      clearTimeout(timeout);
    }

    const payload = await groqResponse.json().catch(() => ({}));

    if (!groqResponse.ok) {
      const providerMessage = payload?.error?.message || "Groq request failed.";
      const status = groqResponse.status === 429 ? 429 : 502;
      return res.status(status).json({ error: providerMessage });
    }

    const answer = payload?.choices?.[0]?.message?.content?.trim();
    if (!answer) {
      return res.status(502).json({ error: "Groq returned an empty response. Please try again." });
    }

    return res.json({
      answer,
      model: payload.model || GROQ_MODEL,
      usage: payload.usage || null
    });
  } catch (error) {
    const isTimeout = error?.name === "AbortError";
    console.error("Chat request failed:", error?.message || error);
    return res.status(isTimeout ? 504 : 502).json({
      error: isTimeout ? "The AI response timed out. Please try again." : "Unable to reach Groq right now. Check your connection and try again."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Groq Voice Assistant running at http://localhost:${PORT}`);
  if (!GROQ_API_KEY) console.warn("Missing GROQ_API_KEY. Add it to .env before chatting.");
});
