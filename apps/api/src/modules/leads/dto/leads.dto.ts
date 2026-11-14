import { IsEmail, IsNotEmpty, IsOptional, IsString, IsBoolean, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateContactEnquiryDto {
  @ApiProperty({ example: 'Rakesh Patel' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @ApiProperty({ example: 'rakesh@realvistaproperties.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+91 98234 56789' })
  @IsString()
  @IsNotEmpty()
  @Length(7, 30)
  phone: string;

  @ApiProperty({ example: 'RealVista Properties' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  company: string;

  @ApiProperty({ example: 'Real Estate' })
  @IsString()
  @IsNotEmpty()
  industry: string;

  @ApiProperty({ example: 'Looking to qualify inbound property buyers and book site visits.' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 4000)
  message: string;

  @ApiPropertyOptional({ example: '/product/outbound-calling' })
  @IsString()
  @IsOptional()
  sourcePage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  utmParams?: Record<string, string>;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  consent: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  honeypot?: string;
}

export class CreateDemoBookingDto {
  @ApiProperty({ example: 'Priya Sharma' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @ApiProperty({ example: 'priya.sharma@medicare.in' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+91 99887 66554' })
  @IsString()
  @IsNotEmpty()
  @Length(7, 30)
  phone: string;

  @ApiProperty({ example: 'Medicare Health Services' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  company: string;

  @ApiProperty({ example: 'Healthcare' })
  @IsString()
  @IsNotEmpty()
  industry: string;

  @ApiProperty({ example: '2026-11-20' })
  @IsString()
  @IsNotEmpty()
  preferredDate: string;

  @ApiProperty({ example: '02:00 PM' })
  @IsString()
  @IsNotEmpty()
  preferredTime: string;

  @ApiPropertyOptional({ example: 'Asia/Kolkata' })
  @IsString()
  @IsOptional()
  timeZone?: string;

  @ApiPropertyOptional({ example: 'Interested in patient appointment scheduling in Hindi.' })
  @IsString()
  @IsOptional()
  requirements?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  consent: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  honeypot?: string;
}

export class SubscribeNewsletterDto {
  @ApiProperty({ example: 'lead@company.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ example: '/' })
  @IsString()
  @IsOptional()
  sourcePage?: string;
}

export class UnsubscribeNewsletterDto {
  @ApiProperty({ example: 'lead@company.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

