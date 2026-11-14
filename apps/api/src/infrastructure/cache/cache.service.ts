import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CacheService.name);
  private redisClient: Redis | null = null;
  private readonly inMemoryCache = new Map<string, { value: string; expiresAt: number }>();
  private isRedisConnected = false;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const host = this.configService.get<string>('REDIS_HOST', 'localhost');
    const port = this.configService.get<number>('REDIS_PORT', 6379);
    const password = this.configService.get<string>('REDIS_PASSWORD');

    try {
      this.redisClient = new Redis({
        host,
        port,
        password: password || undefined,
        retryStrategy: (times) => {
          if (times > 3) {
            this.logger.warn('Redis reconnection attempts exceeded. Using high-speed in-memory cache.');
            return null; // Stop retrying
          }
          return Math.min(times * 100, 2000);
        },
        maxRetriesPerRequest: 1,
        connectTimeout: 2000,
        lazyConnect: true
      });

      this.redisClient.on('connect', () => {
        this.isRedisConnected = true;
        this.logger.log('Redis cache connected successfully.');
      });

      this.redisClient.on('error', (err) => {
        this.isRedisConnected = false;
        // Suppress noisy logs, handled by retryStrategy
      });

      await this.redisClient.connect().catch((err) => {
        this.logger.warn(`Redis not available (${err.message}). Defaulting to in-memory cache.`);
      });
    } catch (e) {
      this.logger.warn('Failed to initialize Redis client. Defaulting to in-memory cache.');
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      if (this.isRedisConnected && this.redisClient) {
        const data = await this.redisClient.get(key);
        return data ? JSON.parse(data) : null;
      }
    } catch {
      // Fallback to in-memory
    }

    const item = this.inMemoryCache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.inMemoryCache.delete(key);
      return null;
    }
    return JSON.parse(item.value);
  }

  async set(key: string, value: any, ttlSeconds = 3600): Promise<void> {
    const serialized = JSON.stringify(value);
    try {
      if (this.isRedisConnected && this.redisClient) {
        await this.redisClient.set(key, serialized, 'EX', ttlSeconds);
        return;
      }
    } catch {
      // Fallback
    }

    this.inMemoryCache.set(key, {
      value: serialized,
      expiresAt: Date.now() + ttlSeconds * 1000
    });
  }

  async del(key: string): Promise<void> {
    try {
      if (this.isRedisConnected && this.redisClient) {
        await this.redisClient.del(key);
      }
    } catch {
      // Ignore
    }
    this.inMemoryCache.delete(key);
  }

  async invalidatePattern(pattern: string): Promise<void> {
    try {
      if (this.isRedisConnected && this.redisClient) {
        const keys = await this.redisClient.keys(pattern);
        if (keys.length > 0) {
          await this.redisClient.del(...keys);
        }
      }
    } catch {
      // Ignore
    }

    // Clear matching in-memory keys
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    for (const key of this.inMemoryCache.keys()) {
      if (regex.test(key)) {
        this.inMemoryCache.delete(key);
      }
    }
  }

  isReady(): boolean {
    return true; // Cache service is always ready either via Redis or memory
  }

  async onModuleDestroy() {
    if (this.redisClient) {
      try {
        await this.redisClient.quit();
      } catch {
        // Ignore
      }
    }
  }
}

