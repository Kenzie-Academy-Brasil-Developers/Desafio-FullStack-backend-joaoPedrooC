import { ConflictException, Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  @Post()
  async create(createUserDto: CreateUserDto) {
    const findByEmail = await this.prisma.user.findFirst({ where: { email: createUserDto.email } })
    const findByNumber = await this.prisma.user.findFirst({ where: { number: createUserDto.number } })
    
    if(findByEmail || findByNumber) {
      throw new ConflictException('User already exists');
    }

    const user = new User();
    Object.assign(user, { ...createUserDto });

    const createdUser = await this.prisma.user.create({ data: { ...user } });
    return plainToInstance(User, createdUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}