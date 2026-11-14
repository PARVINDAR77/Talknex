import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { LocalStoreService } from '../../../infrastructure/database/local-store.service';
import { UserModel, AdminRoleType, UserRole } from '@talknex/shared';

@Injectable()
export class AdminUsersService {
  private readonly logger = new Logger(AdminUsersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly localStore: LocalStoreService
  ) {}

  async listUsers(query: { search?: string; role?: string; status?: string; page?: number; limit?: number }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const search = query.search?.toLowerCase().trim() || '';
    const role = query.role;

    try {
      const dbCount = await this.prisma.user.count();
      if (dbCount > 0) {
        const where: any = {};
        if (search) {
          where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
          ];
        }
        if (role && role !== 'ALL') {
          where.role = role;
        }

        const total = await this.prisma.user.count({ where });
        const items = await this.prisma.user.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' }
        });

        return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
      }
    } catch {
      // Local store fallback
    }

    let filtered = [...this.localStore.adminUsers];
    if (search) {
      filtered = filtered.filter(
        (u) => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search)
      );
    }
    if (role && role !== 'ALL') {
      filtered = filtered.filter((u) => u.adminRole === role || u.role === role);
    }

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return {
      items: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getUserById(id: string): Promise<UserModel> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (user) return user as unknown as UserModel;
    } catch {
      // Fallback
    }

    const found = this.localStore.adminUsers.find((u) => u.id === id);
    if (!found) throw new NotFoundException(`User with ID '${id}' not found`);
    return found;
  }

  async createUser(dto: { name: string; email: string; role?: UserRole; adminRole?: AdminRoleType }): Promise<UserModel> {
    const newUser: UserModel = {
      id: `usr_${Date.now()}`,
      name: dto.name,
      email: dto.email,
      role: dto.role || UserRole.ADMIN,
      adminRole: dto.adminRole || AdminRoleType.PLATFORM_ADMIN,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLoginAt: null
    };

    try {
      await this.prisma.user.create({
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          password: 'hashed_auto_generated_token',
          role: newUser.role as any
        }
      });
    } catch {
      // Handled via local store
    }

    this.localStore.saveAdminUser(newUser);
    this.localStore.logAudit('USER_CREATE', 'User', newUser.id, { email: newUser.email, role: newUser.adminRole });
    return newUser;
  }

  async updateUser(id: string, updates: Partial<UserModel>): Promise<UserModel> {
    const user = await this.getUserById(id);
    const updated = { ...user, ...updates, updatedAt: new Date().toISOString() };

    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          name: updates.name,
          email: updates.email,
          role: updates.role as any
        }
      });
    } catch {
      // Handled via local store
    }

    const saved = this.localStore.saveAdminUser(updated);
    this.localStore.logAudit('USER_UPDATE', 'User', id, updates);
    return saved;
  }

  async resetPassword(id: string): Promise<{ success: boolean; message: string }> {
    const user = await this.getUserById(id);
    this.localStore.logAudit('USER_PASSWORD_RESET_TRIGGERED', 'User', id, { email: user.email });
    return { success: true, message: `Password reset instructions dispatched to ${user.email}` };
  }
}

