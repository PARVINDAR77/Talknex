import type { Metadata } from 'next';
import '../styles/globals.css';
import { ShellLayout } from '../components/layout/ShellLayout';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://talknex.com'),
  title: {
    default: 'TalkNex — Turn Conversations into Business Growth with AI Voice Agents',
    template: '%s | TalkNex AI Voice Platform'
  },
  description:
    'Create human-like AI voice agents to handle calls, qualify leads, convert customers, provide support and automate business conversations at scale. Built for India with native Hindi, Gujarati, and English support.',
  keywords: [
    'AI Voice Agents',
    'AI Calling Software',
    'Automated Outbound Calling',
    'AI Receptionist',
    'AI Lead Qualification',
    'AI Calling Software India',
    'Business Call Automation'
  ],
  authors: [{ name: 'Emperor Smart Solutions' }],
  creator: 'Emperor Smart Solutions',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://talknex.com',
    siteName: 'TalkNex',
    title: 'TalkNex — Turn Conversations into Business Growth with AI Voice Agents',
    description:
      'Autonomous conversational AI voice agents for enterprise inbound and outbound business calling.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TalkNex AI Voice Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TalkNex — Turn Conversations into Business Growth with AI Voice Agents',
    description: 'Enterprise AI voice platform for automated calling and lead qualification.',
    creator: '@talknex'
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-[#00f59b] selection:text-[#060b18]">
        <ShellLayout>{children}</ShellLayout>
      </body>
    </html>
  );
}
