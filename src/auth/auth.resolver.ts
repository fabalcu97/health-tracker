import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signUp(@Args('input') input: SignUpInput): Promise<User> {
    return this.authService.signUp(input);
  }

  @Mutation(() => User)
  async signIn(@Args('input') input: SignInInput): Promise<User> {
    return this.authService.signIn(input.email, input.password);
  }
}
