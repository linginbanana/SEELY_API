import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async findByUsername(username: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { username },
    });
  }
  async create(createUserDto: CreateUserDto) {
    // create hash
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // replace hashed to password
    const user = {
      ...createUserDto,
      password: hashedPassword,
    };

    // save new user with hashed password
    return this.repository.save(user);
  }

  async findAllPaginated(page: number = 1, limit: number = 10) {
    const [result, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' }, // หรือ 'DESC' แล้วแต่ที่คุณต้องการ
    });

    return {
      data: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateByOwner(id: number, dto: any) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found or you are not the owner');
    }
    Object.assign(user, dto);
    return this.repository.save(user);
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.repository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async removeByOwner(id: number, ownerId: number) {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    // ตรวจสอบว่าเจ้าของตรงกับ req.user.sub หรือไม่
    if (user.id !== ownerId) {
      throw new Error('You are not allowed to delete this user');
    }

    await this.repository.remove(user);

    return { message: 'User removed successfully' };
  }
}
