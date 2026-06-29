import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../db/db.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>) {}

  async findOne(username: string) {
    return this.db.query.users.findFirst({
      where: eq(schema.users.username, username),
    });
  }

  async create(dto: CreateUserDto) {
    console.log(dto);
    const user = await this.findOne(dto.username);
    if (user) {
      throw new ConflictException('User already exists');
    }
    const saltRounds = 10;
    const password = await bcrypt.hash(dto.password, saltRounds);
    return this.db.insert(schema.users).values({
      username: dto.username,
      password,
    });
  }
}
