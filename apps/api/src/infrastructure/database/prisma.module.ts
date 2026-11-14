import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { LocalStoreService } from './local-store.service';

@Global()
@Module({
  providers: [PrismaService, LocalStoreService],
  exports: [PrismaService, LocalStoreService]
})
export class PrismaModule {}
