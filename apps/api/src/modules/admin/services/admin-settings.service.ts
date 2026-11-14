import { Injectable } from '@nestjs/common';
import { LocalStoreService } from '../../../infrastructure/database/local-store.service';
import { WebsiteSettingModel } from '@talknex/shared';

@Injectable()
export class AdminSettingsService {
  constructor(private readonly localStore: LocalStoreService) {}

  async getSettings(): Promise<WebsiteSettingModel & { platformOwner: string; environment: string; apiVersion: string }> {
    return {
      ...this.localStore.websiteSettings,
      platformOwner: 'Emperor Smart Solutions',
      environment: process.env.NODE_ENV || 'production',
      apiVersion: 'v1.0.0'
    };
  }

  async updateSettings(updates: Partial<WebsiteSettingModel>): Promise<WebsiteSettingModel> {
    this.localStore.websiteSettings = {
      ...this.localStore.websiteSettings,
      ...updates
    };
    this.localStore.logAudit('SETTINGS_UPDATE', 'WebsiteSetting', 'default-settings', updates);
    return this.localStore.websiteSettings;
  }
}

