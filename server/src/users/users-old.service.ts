import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersServiceOld {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      return undefined;
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(dto: CreateUserDto): Promise<User> {
    console.log(dto);
    const user = await this.findOne(dto.username);
    if (user) {
      throw new ConflictException('User already exists');
    }
    const saltRounds = 10;
    const password = await bcrypt.hash(dto.password, saltRounds);
    const newUser = this.usersRepository.create({
      username: dto.username,
      password,
    });
    return this.usersRepository.save(newUser);
  }
}
