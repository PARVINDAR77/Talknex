import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { LocalStoreService } from '../../../infrastructure/database/local-store.service';
import { TransactionModel, TransactionStatus } from '@talknex/shared';

@Injectable()
export class AdminBillingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly localStore: LocalStoreService
  ) {}

  async listTransactions(query: { search?: string; status?: string; page?: number; limit?: number }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    let items = [...this.localStore.transactions];
    if (query.search) {
      const q = query.search.toLowerCase();
      items = items.filter(
        (t) =>
          t.referenceId.toLowerCase().includes(q) ||
          t.organizationName?.toLowerCase().includes(q) ||
          t.paymentMethod.toLowerCase().includes(q)
      );
    }
    if (query.status && query.status !== 'ALL') {
      items = items.filter((t) => t.status === query.status);
    }

    const total = items.length;
    const paginated = items.slice((page - 1) * limit, page * limit);
    return {
      items: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getRevenueMetrics() {
    return {
      totalRevenueInr: 1875420,
      monthlyRecurringRevenueInr: 1450000,
      annualRecurringRevenueInr: 17400000,
      outstandingPaymentsInr: 65400,
      averageRevenuePerAccountInr: 7562,
      grossProfitMarginPercent: 68.4
    };
  }

  async processRefund(id: string, reason?: string): Promise<{ success: boolean; message: string; transaction: TransactionModel }> {
    const tx = this.localStore.transactions.find((t) => t.id === id || t.referenceId === id);
    if (!tx) throw new NotFoundException(`Transaction '${id}' not found`);

    tx.status = TransactionStatus.REFUNDED;
    this.localStore.logAudit('BILLING_REFUND_ISSUED', 'Transaction', tx.id, { amountInr: tx.amountInr, reason });
    return {
      success: true,
      message: `Refund of ₹${tx.amountInr.toLocaleString('en-IN')} approved and initiated to ${tx.paymentMethod}`,
      transaction: tx
    };
  }
}

