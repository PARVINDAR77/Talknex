import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permissions.decorator';
import { AdminUserSession } from './admin-auth.guard';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const adminUser = request.adminUser as AdminUserSession;

    if (!adminUser) {
      throw new ForbiddenException('Admin user not authenticated');
    }

    // Super admin has all permissions
    if (adminUser.permissions.includes('*') || adminUser.role === 'SUPER_ADMIN') {
      return true;
    }

    const hasPermission = requiredPermissions.every((perm) =>
      adminUser.permissions.includes(perm)
    );

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient administrative permissions');
    }

    return true;
  }
}

