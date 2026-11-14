import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { EmailService } from '../../infrastructure/email/email.service';
import { LocalStoreService } from '../../infrastructure/database/local-store.service';
import {
  CreateContactEnquiryDto,
  CreateDemoBookingDto,
  SubscribeNewsletterDto
} from '@talknex/contracts';
import { LeadStatus, BookingStatus } from '@prisma/client';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly localStore: LocalStoreService
  ) {}

  async createContactEnquiry(dto: CreateContactEnquiryDto, ipAddress?: string) {
    if (dto.honeypot && dto.honeypot.trim().length > 0) {
      this.logger.warn(`Spam honeypot triggered by IP ${ipAddress}`);
      return { success: true, message: 'Your message has been received.' };
    }

    let enquiryId = `enq_${Date.now()}`;
    const createdAt = new Date().toISOString();

    try {
      const enquiry = await this.prisma.contactEnquiry.create({
        data: {
          name: dto.name,
          email: dto.email.toLowerCase(),
          phone: dto.phone,
          company: dto.company,
          industry: dto.industry,
          message: dto.message,
          sourcePage: dto.sourcePage || '/contact',
          utmParams: dto.utmParams ? (dto.utmParams as any) : undefined,
          status: LeadStatus.NEW,
          ipAddress: ipAddress || null
        }
      });
      enquiryId = enquiry.id;

      await this.prisma.auditLog.create({
        data: {
          action: 'CONTACT_ENQUIRY_CREATED',
          entityType: 'ContactEnquiry',
          entityId: enquiry.id,
          payload: { email: enquiry.email, company: enquiry.company }
        }
      });
    } catch {
      // Persist in local store
      this.localStore.saveContactEnquiry({
        id: enquiryId,
        name: dto.name,
        email: dto.email.toLowerCase(),
        phone: dto.phone,
        company: dto.company,
        industry: dto.industry,
        message: dto.message,
        sourcePage: dto.sourcePage || '/contact',
        utmParams: dto.utmParams || null,
        status: 'NEW' as any,
        ipAddress: ipAddress || null,
        createdAt
      });
    }

    this.emailService
      .sendContactConfirmation(dto.name, dto.email)
      .catch((e) => this.logger.error('Error sending contact confirmation email', e));

    this.emailService
      .sendInternalLeadNotification('Contact Enquiry', {
        Name: dto.name,
        Email: dto.email,
        Phone: dto.phone,
        Company: dto.company,
        Industry: dto.industry,
        Message: dto.message
      })
      .catch((e) => this.logger.error('Error sending internal lead notification email', e));

    return {
      id: enquiryId,
      message: 'Thank you for contacting TalkNex. Our team will reach out shortly.',
      createdAt
    };
  }

  async createDemoBooking(dto: CreateDemoBookingDto) {
    if (dto.honeypot && dto.honeypot.trim().length > 0) {
      return { success: true, message: 'Your demonstration has been scheduled.' };
    }

    const preferredDateObj = new Date(dto.preferredDate);
    if (isNaN(preferredDateObj.getTime())) {
      throw new BadRequestException('Invalid date provided');
    }

    let bookingId = `book_${Date.now()}`;
    const createdAt = new Date().toISOString();

    try {
      const booking = await this.prisma.demoBooking.create({
        data: {
          name: dto.name,
          email: dto.email.toLowerCase(),
          phone: dto.phone,
          company: dto.company,
          industry: dto.industry,
          preferredDate: preferredDateObj,
          preferredTime: dto.preferredTime,
          timeZone: dto.timeZone || 'Asia/Kolkata',
          requirements: dto.requirements || null,
          status: BookingStatus.CONFIRMED
        }
      });
      bookingId = booking.id;

      await this.prisma.auditLog.create({
        data: {
          action: 'DEMO_BOOKING_CREATED',
          entityType: 'DemoBooking',
          entityId: booking.id,
          payload: {
            email: booking.email,
            company: booking.company,
            date: dto.preferredDate,
            time: dto.preferredTime
          }
        }
      });
    } catch {
      // Persist in local store
      this.localStore.saveDemoBooking({
        id: bookingId,
        name: dto.name,
        email: dto.email.toLowerCase(),
        phone: dto.phone,
        company: dto.company,
        industry: dto.industry,
        preferredDate: dto.preferredDate,
        preferredTime: dto.preferredTime,
        timeZone: dto.timeZone || 'Asia/Kolkata',
        requirements: dto.requirements || null,
        status: 'CONFIRMED' as any,
        createdAt
      });
    }

    this.emailService
      .sendDemoConfirmation(dto.name, dto.email, dto.preferredDate, dto.preferredTime)
      .catch((e) => this.logger.error('Error sending demo confirmation email', e));

    this.emailService
      .sendInternalLeadNotification('Demo Booking', {
        Name: dto.name,
        Email: dto.email,
        Phone: dto.phone,
        Company: dto.company,
        Industry: dto.industry,
        Date: dto.preferredDate,
        Time: dto.preferredTime,
        Requirements: dto.requirements
      })
      .catch((e) => this.logger.error('Error sending demo internal notification', e));

    return {
      id: bookingId,
      message: 'Demo demonstration successfully booked. A confirmation email has been sent.',
      bookingDetails: {
        date: dto.preferredDate,
        time: dto.preferredTime,
        timeZone: dto.timeZone || 'Asia/Kolkata'
      }
    };
  }

  getDemoAvailability() {
    const availableDates = [];
    const now = new Date();
    const timeSlots = [
      '10:30 AM',
      '11:30 AM',
      '02:00 PM',
      '03:30 PM',
      '04:30 PM',
      '05:30 PM'
    ];

    let count = 0;
    const current = new Date(now);
    current.setDate(current.getDate() + 1);

    while (count < 10) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0) {
        const yyyy = current.getFullYear();
        const mm = String(current.getMonth() + 1).padStart(2, '0');
        const dd = String(current.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;

        availableDates.push({
          date: dateStr,
          dayName: current.toLocaleDateString('en-US', { weekday: 'short' }),
          slots: timeSlots
        });
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    return {
      timeZone: 'Asia/Kolkata (IST)',
      availableDates
    };
  }

  async subscribeNewsletter(dto: SubscribeNewsletterDto) {
    const email = dto.email.trim().toLowerCase();
    try {
      const subscriber = await this.prisma.newsletterSubscriber.upsert({
        where: { email },
        update: { isActive: true, unsubscribedAt: null },
        create: { email, isActive: true }
      });
      return {
        id: subscriber.id,
        message: 'Thank you for subscribing to TalkNex insights and product updates.'
      };
    } catch {
      const subscriber = this.localStore.saveNewsletterSubscriber(email);
      return {
        id: subscriber.id,
        message: 'Thank you for subscribing to TalkNex insights and product updates.'
      };
    }
  }

  async unsubscribeNewsletter(email: string) {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const subscriber = await this.prisma.newsletterSubscriber.findUnique({
        where: { email: cleanEmail }
      });
      if (subscriber) {
        await this.prisma.newsletterSubscriber.update({
          where: { email: cleanEmail },
          data: { isActive: false, unsubscribedAt: new Date() }
        });
      }
    } catch {
      const item = this.localStore.newsletterSubscribers.find((s) => s.email === cleanEmail);
      if (item) {
        item.isActive = false;
        item.unsubscribedAt = new Date().toISOString();
      }
    }
    return {
      message: 'You have been successfully unsubscribed from TalkNex marketing communications.'
    };
  }
}
