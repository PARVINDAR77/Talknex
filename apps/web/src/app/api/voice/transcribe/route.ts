import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_WHISPER_MODEL = process.env.GROQ_WHISPER_MODEL || 'whisper-large-v3-turbo';

export async function POST(req: NextRequest) {
  try {
    let file: File | null = null;
    const contentType = req.headers.get('content-type') || 'audio/webm';
    const cleanMime = contentType.split(';')[0].trim();
    const ext = cleanMime.includes('wav') ? 'wav' : cleanMime.includes('mp4') ? 'mp4' : cleanMime.includes('ogg') ? 'ogg' : 'webm';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData().catch(() => null);
      if (formData) {
        const rawFile = formData.get('file');
        if (rawFile && typeof rawFile === 'object' && 'arrayBuffer' in rawFile) {
          const blob = rawFile as Blob;
          if (blob.size > 200) {
            const arrayBuf = await blob.arrayBuffer();
            file = new File([Buffer.from(arrayBuf)], `recording.${ext}`, { type: blob.type || cleanMime });
          }
        }
      }
    } else {
      const arrayBuf = await req.arrayBuffer();
      if (arrayBuf && arrayBuf.byteLength > 200) {
        file = new File([Buffer.from(arrayBuf)], `recording.${ext}`, { type: cleanMime });
      }
    }

    if (!file || file.size < 200) {
      return NextResponse.json({ text: '', warning: 'Audio clip too short or empty' });
    }

    if (!GROQ_API_KEY) {
      return NextResponse.json({
        text: 'Namaste! TalkNex AI demo assistant.',
        model: 'simulated'
      });
    }

    const groqForm = new FormData();
    groqForm.append('file', file);
    groqForm.append('model', GROQ_WHISPER_MODEL);
    groqForm.append('response_format', 'json');
    groqForm.append('prompt', 'Bilingual voice assistant conversation in Hindi, English, and Hinglish.');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`
        },
        body: groqForm,
        signal: controller.signal
      });

      clearTimeout(timeout);

      const payload = await groqRes.json().catch(() => ({}));

      if (!groqRes.ok) {
        const msg = payload?.error?.message || 'Transcription failed.';
        console.warn('Groq whisper warning:', msg);
        if (msg.includes('could not process file') || msg.includes('invalid_media_file')) {
          return NextResponse.json({ text: '', warning: 'Could not decode audio, please speak again.' });
        }
        return NextResponse.json({ text: '', error: msg });
      }

      const transcribed = (payload.text || '').trim();

      return NextResponse.json({
        text: transcribed,
        model: GROQ_WHISPER_MODEL
      });
    } catch (fetchErr) {
      clearTimeout(timeout);
      console.warn('Groq whisper network issue:', fetchErr);
      return NextResponse.json({ text: '', error: 'Transcription network timeout' });
    }
  } catch (err) {
    console.error('Transcribe route error:', err);
    return NextResponse.json({ text: '', error: 'Transcription service error' }, { status: 500 });
  }
}
