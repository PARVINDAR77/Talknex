import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { LocalStoreService } from '../../../infrastructure/database/local-store.service';
import { OrganizationModel, OrganizationStatus } from '@talknex/shared';

@Injectable()
export class AdminOrganizationsService {
  private readonly logger = new Logger(AdminOrganizationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly localStore: LocalStoreService
  ) {}

  async listOrganizations(query: {
    search?: string;
    status?: string;
    industry?: string;
    plan?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const search = query.search?.toLowerCase().trim() || '';
    const status = query.status?.toUpperCase();

    try {
      const dbCount = await this.prisma.organization.count();
      if (dbCount > 0) {
        const where: any = {};
        if (search) {
          where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { businessEmail: { contains: search, mode: 'insensitive' } },
            { industry: { contains: search, mode: 'insensitive' } }
          ];
        }
        if (status && status !== 'ALL') {
          where.status = status;
        }

        const total = await this.prisma.organization.count({ where });
        const items = await this.prisma.organization.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' }
        });

        return {
          items,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        };
      }
    } catch {
      // Fallback to local store
    }

    let filtered = [...this.localStore.organizations];
    if (search) {
      filtered = filtered.filter(
        (o) =>
          o.name.toLowerCase().includes(search) ||
          o.businessEmail.toLowerCase().includes(search) ||
          o.industry.toLowerCase().includes(search)
      );
    }
    if (status && status !== 'ALL') {
      filtered = filtered.filter((o) => o.status === status);
    }
    if (query.industry && query.industry !== 'ALL') {
      filtered = filtered.filter((o) => o.industry === query.industry);
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return {
      items: paginated,
      total,
      page,
      limit,
      totalPages
    };
  }

  async getOrganizationById(id: string): Promise<OrganizationModel> {
    try {
      const org = await this.prisma.organization.findUnique({
        where: { id },
        include: { members: { include: { user: true } }, subscriptions: true }
      });
      if (org) return org as unknown as OrganizationModel;
    } catch {
      // Fallback
    }

    const found = this.localStore.organizations.find((o) => o.id === id || o.slug === id);
    if (!found) throw new NotFoundException(`Organization with ID or slug '${id}' not found`);
    return found;
  }

  async createOrganization(dto: {
    name: string;
    businessEmail: string;
    phone?: string;
    industry: string;
    planId?: string;
    walletBalanceInr?: number;
  }): Promise<OrganizationModel> {
    const slug = dto.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newOrg: OrganizationModel = {
      id: `org_${Date.now()}`,
      name: dto.name,
      slug,
      businessEmail: dto.businessEmail,
      phone: dto.phone || null,
      industry: dto.industry,
      status: OrganizationStatus.ACTIVE,
      planId: dto.planId || 'growth',
      planName: dto.planId ? dto.planId.charAt(0).toUpperCase() + dto.planId.slice(1) : 'Growth',
      walletBalanceInr: dto.walletBalanceInr || 0,
      usersCount: 1,
      calls30d: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await this.prisma.organization.create({
        data: {
          id: newOrg.id,
          name: newOrg.name,
          slug: newOrg.slug,
          businessEmail: newOrg.businessEmail,
          phone: newOrg.phone,
          industry: newOrg.industry,
          status: newOrg.status,
          planId: newOrg.planId,
          walletBalanceInr: newOrg.walletBalanceInr
        }
      });
    } catch {
      // Local store handles fallback
    }

    this.localStore.saveOrganization(newOrg);
    this.localStore.logAudit('ORGANIZATION_CREATE', 'Organization', newOrg.id, { name: newOrg.name, plan: newOrg.planName });
    return newOrg;
  }

  async updateOrganization(id: string, updates: Partial<OrganizationModel>): Promise<OrganizationModel> {
    const org = await this.getOrganizationById(id);
    const updated = { ...org, ...updates, updatedAt: new Date().toISOString() };

    try {
      await this.prisma.organization.update({
        where: { id },
        data: {
          name: updates.name,
          businessEmail: updates.businessEmail,
          phone: updates.phone,
          industry: updates.industry,
          status: updates.status,
          planId: updates.planId,
          walletBalanceInr: updates.walletBalanceInr
        }
      });
    } catch {
      // Handled via local store
    }

    const saved = this.localStore.saveOrganization(updated);
    this.localStore.logAudit('ORGANIZATION_UPDATE', 'Organization', id, updates);
    return saved;
  }

  async updateStatus(id: string, status: OrganizationStatus): Promise<OrganizationModel> {
    const org = await this.getOrganizationById(id);
    const updated = { ...org, status, updatedAt: new Date().toISOString() };

    try {
      await this.prisma.organization.update({
        where: { id },
        data: { status }
      });
    } catch {
      // Handled via local store
    }

    const saved = this.localStore.saveOrganization(updated);
    this.localStore.logAudit(`ORGANIZATION_${status}`, 'Organization', id, { previousStatus: org.status, newStatus: status });
    return saved;
  }

  async deleteOrganization(id: string): Promise<{ success: boolean; message: string }> {
    try {
      await this.prisma.organization.delete({ where: { id } });
    } catch {
      // Local store
    }
    this.localStore.deleteOrganization(id);
    this.localStore.logAudit('ORGANIZATION_DELETE', 'Organization', id);
    return { success: true, message: `Organization ${id} deleted successfully` };
  }
}

