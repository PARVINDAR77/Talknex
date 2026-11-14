import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AdminUsersService } from '../services/admin-users.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RequirePermissions } from '../guards/permissions.decorator';

@ApiTags('Admin - Users & Roles')
@Controller('admin/users')
@UseGuards(AdminAuthGuard, PermissionsGuard)
export class AdminUsersController {
  constructor(private readonly usersService: AdminUsersService) {}

  @Get()
  @RequirePermissions('users.read')
  @ApiOperation({ summary: 'List platform users with role filters and pagination' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'role', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async list(
    @Query('search') search?: string,
    @Query('role') role?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.usersService.listUsers({ search, role, page, limit });
  }

  @Get(':id')
  @RequirePermissions('users.read')
  @ApiOperation({ summary: 'Get user details by ID' })
  async getOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  @RequirePermissions('users.create')
  @ApiOperation({ summary: 'Invite or create new platform/admin user' })
  async create(@Body() body: any) {
    return this.usersService.createUser(body);
  }

  @Patch(':id')
  @RequirePermissions('users.update')
  @ApiOperation({ summary: 'Update user roles and access status' })
  async update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.updateUser(id, body);
  }

  @Post(':id/reset-password')
  @RequirePermissions('users.update')
  @ApiOperation({ summary: 'Trigger secure password reset workflow' })
  async resetPassword(@Param('id') id: string) {
    return this.usersService.resetPassword(id);
  }
}

