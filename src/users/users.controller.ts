import {  Controller,  Get,  Post,  Body,  Param,  UseGuards,  Req,  Delete,  Patch,  Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ✅ Public Read + Pagination
  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.usersService.findAllPaginated(+page, +limit);
  }

  // ✅ Create user (Public)
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  // ✅ Update/Delete (เฉพาะเจ้าของข้อมูล)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: any, @Req() req) {
    return this.usersService.updateByOwner(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req) {
    return this.usersService.removeByOwner(id, req.user.sub);
  }
}
