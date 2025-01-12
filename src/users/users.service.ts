import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private dbService: DatabaseService) {}

  create(createUserInput: CreateUserInput) {
    return this.dbService.user.create({
      data: {
        email: createUserInput.email,
        name: createUserInput.name,
        password: createUserInput.password,
        salt: '',
      },
    });
  }

  findAll() {
    return this.dbService.user.findMany();
  }

  findOne(email: string) {
    return this.dbService.user.findUnique({ where: { email } });
  }

  remove(id: number) {
    return this.dbService.user.delete({ where: { id } });
  }
}
