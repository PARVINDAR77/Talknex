import {
  ContactEnquiryModel,
  DemoBookingModel,
  NewsletterSubscriberModel,
  WebsitePageModel,
  NavigationItemModel,
  PricingPlanModel,
  BlogPostModel,
  BlogCategoryModel,
  UseCaseModel,
  IntegrationModel,
  FaqModel,
  WebsiteSettingModel
} from '@talknex/shared';

export interface ApiResponseMeta {
  requestId: string;
  timestamp: string;
  cached?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  meta: ApiResponseMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  statusCode: number;
  data: T[];
  pagination: PaginationMeta;
  meta: ApiResponseMeta;
}

export interface ApiErrorDetail {
  field?: string;
  constraints?: string[];
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  error: string;
  message: string;
  errors?: ApiErrorDetail[];
  meta: ApiResponseMeta;
}

// Request DTOs
export interface CreateContactEnquiryDto {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  message: string;
  sourcePage?: string;
  utmParams?: Record<string, string>;
  consent: boolean;
  honeypot?: string;
}

export interface CreateDemoBookingDto {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  preferredDate: string;
  preferredTime: string;
  timeZone?: string;
  requirements?: string;
  consent: boolean;
  honeypot?: string;
}

export interface SubscribeNewsletterDto {
  email: string;
  sourcePage?: string;
}

export interface SearchResultItem {
  id: string;
  type: 'blog' | 'use_case' | 'faq' | 'integration';
  title: string;
  snippet: string;
  url: string;
}

export interface SearchResultsResponse {
  query: string;
  totalResults: number;
  items: SearchResultItem[];
}

