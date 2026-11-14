import { Injectable } from '@nestjs/common';
import { LocalStoreService } from '../../../infrastructure/database/local-store.service';

@Injectable()
export class AdminAuditService {
  constructor(private readonly localStore: LocalStoreService) {}

  async listAuditLogs(query: { search?: string; entityType?: string; page?: number; limit?: number }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    let items = [...this.localStore.auditLogs];
    if (query.search) {
      const q = query.search.toLowerCase();
      items = items.filter(
        (l) =>
          l.action.toLowerCase().includes(q) ||
          l.actorName?.toLowerCase().includes(q) ||
          l.entityId.toLowerCase().includes(q)
      );
    }
    if (query.entityType && query.entityType !== 'ALL') {
      items = items.filter((l) => l.entityType === query.entityType);
    }

    const total = items.length;
    const paginated = items.slice((page - 1) * limit, page * limit);
    return { items: paginated, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}

