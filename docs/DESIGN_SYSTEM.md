# DESIGN_SYSTEM.md — TalkNex Visual & Component Design System

Based on the approved visual reference: `TalkNex AI Voice Platform Landing Page.png`.

## 1. Color Palette

### Primary Midnight & Navy (Hero, Interactive Simulator, Dark Accents)
- Deep Midnight Navy: `#060b18`
- Elevated Midnight Surface: `#0b1329`
- Accent Midnight Navy: `#0e1a38`
- Dark Card Background: `rgba(14, 26, 56, 0.75)` with `backdrop-blur-md`
- Dark Border: `rgba(255, 255, 255, 0.1)`

### Vibrant Emerald & Electric Green (Brand Accents & Primary CTAs)
- Electric Green (Primary CTA background): `#00f59b` / `#10b981`
- Emerald Green Dark: `#059669`
- Soundwave Green: `#00f59b`
- Green Badge Glow: `rgba(0, 245, 155, 0.2)`

### Light Content Surfaces (Features, Use Cases, How It Works, Pricing)
- Canvas Background: `#ffffff`
- Soft Grey-Blue Section Background: `#f8fafc` / `#f1f5f9`
- Light Card Surface: `#ffffff`
- Light Card Subtle Border: `#e2e8f0`
- Light Text Heading: `#0f172a` (Slate-900)
- Light Text Body: `#475569` (Slate-600)
- Light Text Muted: `#94a3b8` (Slate-400)

## 2. Typography

- Font Family: `Inter`, `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Display Headings: Font weights 700 / 800, tight tracking (`-0.02em`).
- Subheadings: Font weight 500 / 600.
- Body Copy: 15px / 16px, leading 1.6, font weight 400.
- Monospace / Timestamps: `JetBrains Mono` or `ui-monospace`.

## 3. Elevation & Radius

- Card Border Radius: `rounded-2xl` (16px) or `rounded-xl` (12px)
- Button Radius: `rounded-full` (Pill shape)
- Shadows:
  - Dark Glow: `0 0 30px rgba(0, 245, 155, 0.15)`
  - Card Shadow: `0 10px 30px -10px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)`
  - Elevated Popover: `0 20px 40px -15px rgba(0, 0, 0, 0.1)`

## 4. Key Interactive Components

1. **Header**:
   - TalkNex brand logo with custom green soundwave emblem.
   - Glassmorphic dark navigation bar (`backdrop-blur-md bg-[#060b18]/80`).
   - Dropdown menus with micro-animations.
   - Pill CTA button: "Start Free Trial ->".
2. **Hero Section**:
   - Dark gradient background with subtle radial glow.
   - "AI Voice & Conversation Platform" rounded pill badge.
   - Dual CTAs: Glowing Electric Green Pill + Outline Midnight Dark Button with Calendar icon.
   - Checkmark trust indicators below CTAs.
   - **Hero Interactive Dashboard Visual**:
     - 3D-angled perspective container with perspective effect.
     - Top navigation bar with wallet balance (₹7,450 Credits), notifications, and user avatar.
     - Left navigation icons.
     - Center Voice Waveform visualizer with live call duration (00:01:24) and control buttons (mic, pause, red disconnect, speaker).
     - Right Live Bilingual Transcript panel (Customer query in Hindi, AI Agent response in Hindi with English accents).
     - Floating frosted glass badges: "Human-like Voice", "Multi-language (Hindi, Gujarati, English)", "Lead Capture & CRM".
3. **Audio Playground Card ("Hear It in Action")**:
   - Navy card with animated green soundwave and play/pause controls.
4. **Pricing Cards**:
   - Monthly / Yearly toggle with "Save 20%" green tag.
   - Clear price in Indian Rupees (₹).
   - "Most Popular" highlighted card for Growth Plan.

