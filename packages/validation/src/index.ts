import { z } from 'zod';

export const ContactEnquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid work email address'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number').max(15),
  company: z.string().min(2, 'Company name is required').max(150),
  industry: z.string().min(2, 'Please select your industry').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  sourcePage: z.string().optional(),
  utmParams: z.record(z.string()).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to receive communications from TalkNex'
  }),
  honeypot: z.string().max(0, 'Spam detected').optional()
});

export const DemoBookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid business email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').max(15),
  company: z.string().min(2, 'Company name is required').max(150),
  industry: z.string().min(2, 'Please select your industry').max(100),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  preferredTime: z.string().min(3, 'Please select a preferred time slot'),
  timeZone: z.string().default('Asia/Kolkata'),
  requirements: z.string().max(1000).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to receive demo communications'
  }),
  honeypot: z.string().max(0, 'Spam detected').optional()
});

export const NewsletterSubscriptionSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  sourcePage: z.string().optional()
});

export type ContactEnquiryInput = z.infer<typeof ContactEnquirySchema>;
export type DemoBookingInput = z.infer<typeof DemoBookingSchema>;
export type NewsletterSubscriptionInput = z.infer<typeof NewsletterSubscriptionSchema>;

