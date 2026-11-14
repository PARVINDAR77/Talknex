import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { LocalStoreService } from '../../../infrastructure/database/local-store.service';
import { ContactEnquiryModel, DemoBookingModel, LeadStatus, BookingStatus } from '@talknex/shared';

@Injectable()
export class AdminLeadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly localStore: LocalStoreService
  ) {}

  async listDemoBookings(query: { search?: string; status?: string; page?: number; limit?: number }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    let items = [...this.localStore.demoBookings];
    if (query.search) {
      const q = query.search.toLowerCase();
      items = items.filter((b) => b.name.toLowerCase().includes(q) || b.email.toLowerCase().includes(q) || b.company.toLowerCase().includes(q));
    }
    if (query.status && query.status !== 'ALL') {
      items = items.filter((b) => b.status === query.status);
    }

    const total = items.length;
    const paginated = items.slice((page - 1) * limit, page * limit);
    return { items: paginated, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async listContactEnquiries(query: { search?: string; status?: string; page?: number; limit?: number }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    let items = [...this.localStore.contactEnquiries];
    if (query.search) {
      const q = query.search.toLowerCase();
      items = items.filter((e) => e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.company.toLowerCase().includes(q));
    }
    if (query.status && query.status !== 'ALL') {
      items = items.filter((e) => e.status === query.status);
    }

    const total = items.length;
    const paginated = items.slice((page - 1) * limit, page * limit);
    return { items: paginated, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async updateBookingStatus(id: string, status: BookingStatus): Promise<DemoBookingModel> {
    const booking = this.localStore.demoBookings.find((b) => b.id === id);
    if (!booking) throw new NotFoundException(`Demo booking '${id}' not found`);
    booking.status = status;
    this.localStore.logAudit('DEMO_BOOKING_STATUS_UPDATE', 'DemoBooking', id, { status });
    return booking;
  }

  async updateEnquiryStatus(id: string, status: LeadStatus): Promise<ContactEnquiryModel> {
    const enquiry = this.localStore.contactEnquiries.find((e) => e.id === id);
    if (!enquiry) throw new NotFoundException(`Contact enquiry '${id}' not found`);
    enquiry.status = status;
    this.localStore.logAudit('CONTACT_ENQUIRY_STATUS_UPDATE', 'ContactEnquiry', id, { status });
    return enquiry;
  }
}

