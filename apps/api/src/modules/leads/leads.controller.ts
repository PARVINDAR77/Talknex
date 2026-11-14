import { Controller, Post, Get, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { LeadsService } from './leads.service';
import {
  CreateContactEnquiryDto,
  CreateDemoBookingDto,
  SubscribeNewsletterDto,
  UnsubscribeNewsletterDto
} from './dto/leads.dto';

@ApiTags('Leads & Contact')
@Controller()
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post('contact')
  @ApiOperation({ summary: 'Submit a new business contact enquiry' })
  @ApiResponse({ status: 201, description: 'Enquiry successfully registered' })
  async createContact(@Body() dto: CreateContactEnquiryDto, @Req() req: Request) {
    const ip = req.ip || (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
    return this.leadsService.createContactEnquiry(dto, ip);
  }

  @Post('demo-bookings')
  @ApiOperation({ summary: 'Book an interactive platform demonstration' })
  @ApiResponse({ status: 201, description: 'Demo scheduled successfully' })
  async createDemo(@Body() dto: CreateDemoBookingDto) {
    return this.leadsService.createDemoBooking(dto);
  }

  @Get('demo-bookings/availability')
  @ApiOperation({ summary: 'Query available demo time slots for booking' })
  @ApiResponse({ status: 200, description: 'List of available dates and time slots' })
  getDemoAvailability() {
    return this.leadsService.getDemoAvailability();
  }

  @Post('newsletter/subscribe')
  @ApiOperation({ summary: 'Subscribe to TalkNex email updates and insights' })
  @ApiResponse({ status: 201, description: 'Subscribed successfully' })
  async subscribeNewsletter(@Body() dto: SubscribeNewsletterDto) {
    return this.leadsService.subscribeNewsletter(dto);
  }

  @Post('newsletter/unsubscribe')
  @ApiOperation({ summary: 'Unsubscribe from newsletter' })
  @ApiResponse({ status: 200, description: 'Unsubscribed successfully' })
  async unsubscribeNewsletter(@Body() dto: UnsubscribeNewsletterDto) {
    return this.leadsService.unsubscribeNewsletter(dto.email);
  }
}

