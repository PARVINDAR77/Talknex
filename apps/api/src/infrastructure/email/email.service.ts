import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter | null = null;
  private readonly isConfigured: boolean = false;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('SMTP_HOST');
    const port = this.configService.get<number>('SMTP_PORT', 587);
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASSWORD');

    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
      });
      this.isConfigured = true;
      this.logger.log(`Email service configured with host: ${host}`);
    } else {
      this.logger.log('SMTP not fully configured. Using simulated email logger for development.');
    }
  }

  async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
    const from = this.configService.get<string>('EMAIL_FROM', 'no-reply@talknex.com');

    if (this.isConfigured && this.transporter) {
      try {
        await this.transporter.sendMail({
          from: `"TalkNex AI" <${from}>`,
          to,
          subject,
          html
        });
        this.logger.log(`Email dispatched to ${to} with subject: "${subject}"`);
        return true;
      } catch (error) {
        this.logger.error(`Failed to send email to ${to}: ${error instanceof Error ? error.message : error}`);
        return false;
      }
    }

    // In dev / unconfigured mode: simulate successful dispatch
    this.logger.log(`[SIMULATED EMAIL] To: ${to} | Subject: "${subject}"`);
    return true;
  }

  async sendContactConfirmation(name: string, email: string): Promise<boolean> {
    const subject = 'Thank you for reaching out to TalkNex';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #0f172a;">
        <h2 style="color: #060b18;">Hello ${name},</h2>
        <p>Thank you for contacting <strong>TalkNex by Emperor Smart Solutions</strong>.</p>
        <p>We have received your enquiry regarding our AI Voice Platform. One of our voice automation specialists will review your requirements and reach out within 1 business day.</p>
        <p style="margin-top: 30px; font-size: 13px; color: #64748b;">
          TalkNex — Turn Conversations into Business Growth with AI Voice Agents.<br/>
          © 2026 Emperor Smart Solutions.
        </p>
      </div>
    `;
    return this.sendEmail(email, subject, html);
  }

  async sendDemoConfirmation(name: string, email: string, date: string, time: string): Promise<boolean> {
    const subject = 'Confirmed: TalkNex AI Voice Platform Live Demonstration';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #0f172a;">
        <h2 style="color: #060b18;">Your TalkNex Demonstration is Scheduled</h2>
        <p>Hello ${name},</p>
        <p>We are excited to demonstrate TalkNex's human-like voice agents, real-time Hindi/English bilingual dialogue, and CRM integrations.</p>
        <div style="background: #f8fafc; border-left: 4px solid #00f59b; padding: 15px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Date:</strong> ${date}</p>
          <p style="margin: 5px 0 0;"><strong>Time:</strong> ${time} (IST)</p>
        </div>
        <p>A calendar invitation with Google Meet link has been generated.</p>
        <p style="margin-top: 30px; font-size: 13px; color: #64748b;">
          Emperor Smart Solutions — TalkNex Team
        </p>
      </div>
    `;
    return this.sendEmail(email, subject, html);
  }

  async sendInternalLeadNotification(leadType: 'Contact Enquiry' | 'Demo Booking', details: Record<string, any>): Promise<boolean> {
    const salesEmail = this.configService.get<string>('SALES_NOTIFICATION_EMAIL', 'sales@talknex.com');
    const subject = `[NEW LEAD] ${leadType} received from ${details.name || 'Visitor'}`;
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h3>New ${leadType} Generated</h3>
        <ul>
          ${Object.entries(details).map(([k, v]) => `<li><strong>${k}:</strong> ${typeof v === 'object' ? JSON.stringify(v) : v}</li>`).join('')}
        </ul>
      </div>
    `;
    return this.sendEmail(salesEmail, subject, html);
  }
}

