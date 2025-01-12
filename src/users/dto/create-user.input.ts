import { InputType, Field } from '@nestjs/graphql';

import { User as PrismaUser } from 'prisma/prisma-client';

@InputType()
export class CreateUserInput
  implements Omit<PrismaUser, 'id' | 'createdAt' | 'salt'>
{
  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field()
  password: string;
}
