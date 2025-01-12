import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(private dbService: DatabaseService) {}

  create(createUserInput: CreateUserInput) {
    return this.dbService.user.create({
      data: {
        email: createUserInput.email,
      },
    });
  }

  findByEmail(email: string) {
    return this.dbService.user.findUnique({ where: { email } });
  }

  findAll() {
    return this.dbService.user.findMany();
  }

  remove(id: number) {
    return this.dbService.user.delete({ where: { id } });
  }
}
