import { compare, genSalt, hash } from 'bcrypt';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { SignUpInput } from 'src/auth/dto/sign-up.input';
import { Errors } from 'src/shared/errors';
import { DatabaseService } from 'src/database/database.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private saltRounds: number = 10;

  constructor(
    private dbService: DatabaseService,
    private usersService: UsersService,
  ) {}

  async signIn(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(Errors.BAD_CREDENTIALS);
    }
    const auth = await this.dbService.auth.findMany({
      where: { userId: user.id },
    });

    if (!auth) {
      throw new BadRequestException(Errors.BAD_CREDENTIALS);
    }
    const preferredAuthMethod = auth[0];

    const isMatch = await compare(password, preferredAuthMethod.password);

    if (isMatch) {
      return user;
    }

    throw new BadRequestException(Errors.BAD_CREDENTIALS);
  }

  async signUp(input: SignUpInput): Promise<User> {
    const { email, password } = input;
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException(Errors.USER_ALREADY_EXISTS);
    }

    const salt = await genSalt(this.saltRounds);
    const hashedPassword = await hash(password, salt);

    let newUser: User;
    await this.dbService
      .$transaction(async () => {
        newUser = await this.dbService.user.create({ data: { email } });

        await this.dbService.auth.create({
          data: {
            salt,
            userId: newUser.id,
            password: hashedPassword,
          },
        });
      })
      .catch(() => {
        // TODO: Log the error using the logger!!!
        throw new InternalServerErrorException(Errors.SOMETHING_WENT_WRONG);
      });

    return newUser;
  }
}
