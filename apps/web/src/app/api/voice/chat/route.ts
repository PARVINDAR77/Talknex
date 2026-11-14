import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
// High-speed conversational voice model available on Groq
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

const SYSTEM_PROMPT = `You are the friendly, professional, and highly capable Enterprise Voice Representative for TalkNex (developed by Emperor Smart Solutions Pvt Ltd).
You are speaking live on a phone call with a prospective client, business owner, or candidate.

YOUR CORE IDENTITY & MISSION:
- TalkNex is India's leading enterprise autonomous AI voice platform.
- Parent Company: Emperor Smart Solutions Pvt Ltd.
- Core capability: Replaces repetitive manual telecallers with sub-400ms human-like conversational voice agents across Telephony, WhatsApp, and SMS.
- Native Languages: You fluently understand and speak Gujarati (ગુજરાતી), Hindi (हिंदी), Indian English, and Hinglish.

STRICT DOMAIN BOUNDARY & OFF-TOPIC REFUSAL (MANDATORY):
- You MUST ONLY discuss TalkNex voice AI solutions, Emperor Smart Solutions products, pricing, features, integrations, telephony, and business calling use cases.
- If the user asks about ANYTHING outside this domain (e.g. general knowledge, cricket/sports, politics, weather, recipes, personal advice, coding, entertainment, other brands, random questions):
  * DO NOT answer the question.
  * Politely state that you do not have information on that topic, and immediately offer to assist with TalkNex voice AI services.
  * In Gujarati: "હું ફક્ત ટોકનેક્સ AI વૉઇસ સેવાઓ અને એમ્પરર સ્માર્ટ સોલ્યુશન્સ વિશે માહિતી આપી શકું છું. આ વિષય અંગે મારી પાસે માહિતી ઉપલબ્ધ નથી. હું તમને ટોકનેક્સ કૉલિંગ એજન્ટ્સ કે પ્રાઇસિંગ વિશે કેવી રીતે મદદ કરી શકું?"
  * In Hindi/Hinglish: "Kshama kijiye, main keval TalkNex AI voice solutions aur Emperor Smart Solutions ke baare mein jaankari de sakti hoon. Is vishay par mere paas jankari uplabdh nahi hai. Main aapko TalkNex calling agents ya plans ke baare mein kaise guide kar sakti hoon?"
  * In English: "I apologize, but I am specifically trained to assist with TalkNex Enterprise Voice AI solutions by Emperor Smart Solutions. I don't have information on that topic. How can I help you with our voice agents, telephony integration, or pricing?"

MULTILINGUAL LANGUAGE MIRRORING:
- Always detect the user's language and respond in the EXACT same language:
  1. Gujarati input (e.g., "નમસ્તે", "કેમ છો", "ટોકનેક્સ શું છે", "ભાવ કેટલો છે", "tamaru naam", "shu chhe", "bhav ketlo"): Reply in fluent, polite Gujarati (ગુજરાતી).
  2. Hindi / Hinglish input (e.g., "Mera naam Karan hai", "TalkNex kya hai", "kya fayde hain"): Reply in warm, natural Hindi or Hinglish.
  3. English input: Reply in crisp, professional Indian English.
- Always address the user respectfully (e.g., "Karan bhai" or "Karan ji" when in Gujarati/Hindi).

CONVERSATIONAL INTELLIGENCE & SHORT-TERM MEMORY:
1. Continuity: Remember the caller's name, company, industry, and previous questions throughout the entire call.
2. When the caller introduces themselves ("Mera naam Karan hai" / "Maru naam Karan chhe" / "I am Karan"):
   - Acknowledge warmly:
     * Gujarati: "નમસ્તે કરણભાઈ! ટોકનેક્સમાં તમારું સ્વાગત છે. બોલો, હું તમારા બિઝનેસ કૉલિંગ માટે કેવી રીતે મદદ કરી શકું?"
     * Hindi: "Namaste Karan ji! TalkNex mein aapka swagat hai. Boliye, main aapke business calling ke liye kaise madad kar sakti hoon?"
     * English: "Hello Karan! Welcome to TalkNex. How can I help empower your business with our voice AI agents today?"
3. Direct & Adaptive: Answer the question directly first. Never repeat static robot greetings once conversation has started. If the user pivots to another question, answer the new question immediately.

VERIFIED TALKNEX WEBSITE DATA & KNOWLEDGE BASE:
1. Core Pricing Plans:
   - Starter Plan: ₹1,499/month (500 call minutes, 1 voice agent, basic campaigns, call recording).
   - Growth Plan (Most Popular): ₹4,999/month (2,500 call minutes, 5 voice agents, CRM & Lead sync, analytics).
   - Business Plan: ₹9,999/month (10,000 call minutes, 10 voice agents, calendar & CRM integrations, priority support).
   - Enterprise Plan: Custom volume pricing with dedicated SIP trunks, unlimited minutes, custom voice cloning, and 24/7 SLA.
2. Business ROI & Benefits:
   - 70% cost reduction compared to human telecallers.
   - 24/7 zero-wait availability, zero employee turnover, zero hiring or training costs.
   - Handle 10,000+ concurrent calls simultaneously without queue delays.
3. Telephony & Latency:
   - Ultra-fast sub-400ms conversational turn-taking latency.
   - Full barge-in: If the customer interrupts while AI speaks, AI stops within 100ms and listens.
   - Direct SIP Trunking with Tata Tele Business Services, Airtel, and Exotel.
4. Regulatory & TRAI 140 Compliance:
   - 100% compliant with TRAI TCCCPR guidelines using official 140-series commercial headers.
   - Real-time NDNC DND registry scrubbing.
   - Compliant with lawful Indian telemarketing windows (9 AM to 9 PM).
   - DPDP Act 2023 certified with 256-bit TLS 1.3 encryption.
5. CRM & Messaging Integrations:
   - Bi-directional sync with HubSpot, Salesforce, Zoho CRM, LeadSquared, and Google Sheets.
   - Meta WhatsApp Business API integration: dispatches call summaries, payment links, and PDFs immediately after call.
6. Industry Solutions:
   - Real Estate: Instant 10-second callback on property leads, budget/location qualification, site visit booking.
   - Healthcare & Clinics: Patient appointment booking, doctor schedules, automated WhatsApp reminders.
   - E-Commerce: Cash on Delivery (COD) order verification, address check, and abandoned cart recovery.
   - BFSI & Collections: Polite payment reminder calls with secure UPI links sent on WhatsApp.
   - Automotive: Test drive lead qualification and service scheduling.
7. Free Trial & Demo:
   - Free interactive demonstration available at talknex.emperorsmartsolutions.com/book-demo.

SPOKEN VOICE CONSTRAINTS (CRITICAL):
- Keep answers concise, punchy, and conversational (1 to 3 short sentences maximum).
- Never use markdown formatting (NO asterisks, bullet points, numbered lists, hashtags, bolding, or raw URLs) because this will be spoken aloud by text-to-speech.
- Always sound natural, respectful, energetic, and professional.`;

// Detect language of user query
function detectQueryLanguage(text: string): 'gujarati' | 'hindi' | 'english' {
  const lower = (text || '').toLowerCase();
  // Gujarati script Unicode range: \u0A80-\u0AFF
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gujarati';

  // Common phonetic Gujarati (Gujlish) keywords
  const gujlishKeywords = [
    'kem chho', 'kem cho', 'shu chhe', 'su che', 'maru naam', 'maro naam',
    'tamaru naam', 'tamaro naam', 'aabhar', 'faydo', 'fayda', 'bhav',
    'ketlo', 'ketla', 'kare chhe', 'karvu', 'male', 'sharu', 'paisa',
    'nathi', 'chhe', 'haju', 'bhai', 'gujarati'
  ];
  if (gujlishKeywords.some((k) => lower.includes(k))) return 'gujarati';

  // Devanagari script: \u0900-\u097F or Hindi keywords
  if (/[\u0900-\u097F]/.test(text)) return 'hindi';
  const hindiKeywords = [
    'namaste', 'mera naam', 'kya hai', 'fayde', 'kitna', 'kaise', 'bataiye',
    'shuru', 'chahiye', 'madad', 'karna', 'hoga', 'hai', 'hain'
  ];
  if (hindiKeywords.some((k) => lower.includes(k))) return 'hindi';

  return 'english';
}

// Check if query is strictly out-of-domain
function isOutOfDomainQuery(text: string): boolean {
  const lower = (text || '').toLowerCase().trim();
  
  // Explicit off-topic categories
  const offTopicTriggers = [
    'weather', 'mausam', 'cricket', 'ipl', 'score', 'match', 'cinema',
    'movie', 'actor', 'actress', 'modi', 'election', 'politics', 'rajniti',
    'recipe', 'khana', 'cook', 'biryani', 'pizza', 'song', 'sing', 'joke',
    'shayari', 'poem', 'capital of', 'who is the president', 'prime minister',
    'write code', 'python', 'javascript', 'solve math', 'calculate', '2 + 2',
    'chatgpt', 'openai', 'gemini', 'elon musk', 'bitcoin', 'crypto', 'stocks market'
  ];

  return offTopicTriggers.some((trigger) => lower.includes(trigger));
}

function getTalkNexFallbackResponse(userText: string): string {
  const lang = detectQueryLanguage(userText);
  const lower = (userText || '').toLowerCase();

  // 1. Enforce strict domain boundary refusal
  if (isOutOfDomainQuery(userText)) {
    if (lang === 'gujarati') {
      return 'હું ફક્ત ટોકનેક્સ AI વૉઇસ સેવાઓ અને એમ્પરર સ્માર્ટ સોલ્યુશન્સ વિશે માહિતી આપી શકું છું. આ વિષય અંગે મારી પાસે માહિતી ઉપલબ્ધ નથી. હું તમને ટોકનેક્સ કૉલિંગ એજન્ટ્સ કે પ્રાઇસિંગ વિશે કેવી રીતે મદદ કરી શકું?';
    }
    if (lang === 'hindi') {
      return 'Kshama kijiye, main keval TalkNex AI voice calling solutions aur Emperor Smart Solutions ke baare mein jaankari de sakti hoon. Is vishay par mere paas jankari uplabdh nahi hai. Main aapko TalkNex plans ya voice agents ke baare mein kaise guide kar sakti hoon?';
    }
    return "I apologize, but I am specifically trained to assist with TalkNex Enterprise Voice AI solutions by Emperor Smart Solutions. I don't have information on that topic. How can I assist you with our voice calling agents, telephony integrations, or pricing?";
  }

  // 2. Name introduction query
  if (
    lower.includes('naam') ||
    lower.includes('i am') ||
    lower.includes("i'm") ||
    lower.includes('maru naam') ||
    lower.includes('mera naam') ||
    lower.includes('this is')
  ) {
    const words = userText.trim().split(/\s+/);
    const candidateName = words[words.length - 1] || '';
    const cleanName = candidateName.replace(/[.,!?]/g, '');

    if (lang === 'gujarati') {
      if (cleanName && cleanName.length > 2 && !['chhe', 'hoon', 'hai'].includes(cleanName.toLowerCase())) {
        return `નમસ્તે ${cleanName}ભાઈ! ટોકનેક્સમાં તમારું સ્વાગત છે. બોલો, હું તમારા બિઝનેસ કૉલિંગ માટે કેવી રીતે મદદ કરી શકું?`;
      }
      return 'નમસ્તે! ટોકનેક્સમાં તમારું સ્વાગત છે. બોલો, હું તમારા બિઝનેસ કૉલિંગ માટે કેવી રીતે મદદ કરી શકું?';
    }

    if (lang === 'hindi') {
      if (cleanName && cleanName.length > 2 && !['hoon', 'hun', 'hai', 'here'].includes(cleanName.toLowerCase())) {
        return `Namaste ${cleanName} ji! TalkNex mein aapka swagat hai. Boliye, main aapke business calls ke liye kaise madad kar sakti hoon?`;
      }
      return 'Namaste ji! TalkNex mein aapka swagat hai. Boliye main aapke business calls ke liye kaise madad kar sakti hoon?';
    }

    return `Hello ${cleanName || 'there'}! Welcome to TalkNex by Emperor Smart Solutions. How can I help elevate your business communications today?`;
  }

  // 3. Benefits / Advantages query
  if (
    lower.includes('benefit') ||
    lower.includes('fayda') ||
    lower.includes('faydo') ||
    lower.includes('fayde') ||
    lower.includes('advantage') ||
    lower.includes('kyu') ||
    lower.includes('kem') ||
    lower.includes('why')
  ) {
    if (lang === 'gujarati') {
      return 'ટોકનેક્સ તમારા કૉલિંગ ખર્ચમાં 70% સુધીનો ઘટાડો કરે છે, 24 કલાક ઝીરો-વેઇટ કૉલ્સ હેન્ડલ કરે છે અને એકસાથે હજારો કૉલ્સ ઓટોમેટ કરી શકે છે. તમારે ઇનબાઉન્ડ કસ્ટમર સપોર્ટ માટે જોઈએ છે કે આઉટબાઉન્ડ સેલ્સ માટે?';
    }
    if (lang === 'hindi') {
      return 'TalkNex ke mukhya benefits hain ki yeh aapke calling cost ko 70% tak kam karta hai, 24/7 zero-wait time calls handle karta hai, aur CRM ke saath auto-sync karta hai. Aapko inbound support ke liye chahiye ya outbound sales ke liye?';
    }
    return 'TalkNex reduces call center operational costs by 70%, operates 24/7 with zero hold times, and scales to thousands of concurrent calls with full CRM sync. Are you looking for inbound query handling or outbound sales outreach?';
  }

  // 4. Pricing / Plans query
  if (
    lower.includes('price') ||
    lower.includes('pricing') ||
    lower.includes('cost') ||
    lower.includes('plan') ||
    lower.includes('kitna') ||
    lower.includes('ketlo') ||
    lower.includes('ketla') ||
    lower.includes('rate') ||
    lower.includes('paisa') ||
    lower.includes('bhav')
  ) {
    if (lang === 'gujarati') {
      return 'ટોકનેક્સના પ્લાન્સ દર મહિને ₹1,499 થી શરૂ થાય છે જેમાં 500 કૉલિંગ મિનિટ્સ મળે છે. અમારો સૌથી પોપ્યુલર ગ્રોથ પ્લાન ₹4,999 નો છે જેમાં 2,500 મિનિટ્સ અને CRM ઇન્ટિગ્રેશન ઉપલબ્ધ છે.';
    }
    if (lang === 'hindi') {
      return 'TalkNex ke plans ₹1,499 per month se shuru hote hain jisme 500 calling minutes milti hain. Sabse popular Growth plan ₹4,999 ka hai jisme 2,500 minutes aur CRM integration milta hai. Aapko kaunsa plan suit karega?';
    }
    return 'TalkNex plans start at ₹1,499 per month for 500 minutes. Our most popular Growth plan is ₹4,999 per month, which includes 2,500 minutes, 5 voice personas, and full CRM integration. Would you like details on Starter or Growth?';
  }

  // 5. Demo / Trial query
  if (
    lower.includes('demo') ||
    lower.includes('book') ||
    lower.includes('trial') ||
    lower.includes('appointment') ||
    lower.includes('schedule')
  ) {
    if (lang === 'gujarati') {
      return 'ચોક્કસ! હું તમારો ટોકનેક્સ લાઇવ ડેમો તરત જ શેડ્યૂલ કરી શકું છું. શું ગુરુવારે સાંજે 5:00 વાગ્યાનો સમય તમને અનુકૂળ રહેશે?';
    }
    if (lang === 'hindi') {
      return 'Bilkul! Main aapka TalkNex interactive live demo schedule kar sakti hoon. Kya Thursday shaam 5:00 baje ka slot aapke liye sahi rahega?';
    }
    return 'Absolutely! I can schedule an interactive live demonstration for you. Would Thursday at 5:00 PM work well for your schedule?';
  }

  // 6. Greetings / What is TalkNex
  if (
    lower.includes('hello') ||
    lower.includes('hi') ||
    lower.includes('namaste') ||
    lower.includes('kem cho') ||
    lower.includes('kem chho') ||
    lower.includes('kya hai') ||
    lower.includes('shu chhe') ||
    lower.includes('what is')
  ) {
    if (lang === 'gujarati') {
      return 'નમસ્તે! ટોકનેક્સ એ એમ્પરર સ્માર્ટ સોલ્યુશન્સનું એક એડવાન્સ્ડ AI વૉઇસ કૉલિંગ પ્લેટફોર્મ છે જે માણસની જેમ નેચરલ અવાજમાં વાત કરે છે. બોલો, હું તમને કઈ રીતે મદદ કરી શકું?';
    }
    if (lang === 'hindi') {
      return 'Namaste! TalkNex Emperor Smart Solutions ka ek advanced AI voice calling platform hai jo manual telecallers ki tarah natural baatchit karta hai. Boliye main aapki kya madad kar sakti hoon?';
    }
    return 'Hello! TalkNex by Emperor Smart Solutions is an autonomous AI voice platform that replaces manual telecallers with human-like conversational agents. How can I assist your business today?';
  }

  // 7. General helpful response
  if (lang === 'gujarati') {
    return 'હું તમને ટોકનેક્સ AI વૉઇસ એજન્ટ્સ, કૉલિંગ પ્લાન્સ, અને CRM ઇન્ટિગ્રેશન વિશે પૂરી માહિતી આપી શકું છું. તમે કઈ વિગત જાણવા માંગો છો?';
  }
  if (lang === 'hindi') {
    return 'Main aapki TalkNex AI voice agents, plans, aur CRM integration ke baare mein poori madad kar sakti hoon. Aap kya janna chahte hain?';
  }
  return 'I am ready to help you with TalkNex AI voice agents, enterprise plans, and telephony integrations. What would you like to know?';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const messages = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content || '';

    // Quick boundary guard check on user query
    if (isOutOfDomainQuery(lastUserMessage)) {
      return NextResponse.json({
        answer: getTalkNexFallbackResponse(lastUserMessage),
        model: 'talknex-boundary-guard'
      });
    }

    const sanitizedMessages = messages.slice(-10).map((m: { role?: string; content?: string }) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 2000)
    }));

    if (!GROQ_API_KEY) {
      return NextResponse.json({
        answer: getTalkNexFallbackResponse(lastUserMessage),
        model: 'talknex-direct-v1'
      });
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...sanitizedMessages],
          temperature: 0.6,
          max_completion_tokens: 280,
          stream: false
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (groqResponse.ok) {
        const payload = await groqResponse.json();
        const answer = payload?.choices?.[0]?.message?.content?.trim();
        if (answer) {
          return NextResponse.json({
            answer,
            model: payload.model || GROQ_MODEL
          });
        }
      } else {
        const errBody = await groqResponse.json().catch(() => ({}));
        console.warn('Groq API error status:', groqResponse.status, errBody);
      }
    } catch (fetchErr) {
      console.warn('Groq fetch skipped, using smart telephony fallback:', fetchErr);
    }

    // High quality instant fallback if Groq timed out or network blocked
    return NextResponse.json({
      answer: getTalkNexFallbackResponse(lastUserMessage),
      model: 'talknex-instant-v1'
    });
  } catch (error) {
    console.error('Voice chat route error:', error);
    return NextResponse.json(
      {
        answer: 'Namaste! Main TalkNex AI voice assistant bol rahi hoon. Boliye main aapki kya madad kar sakti hoon?',
        model: 'fallback'
      },
      { status: 200 }
    );
  }
}
