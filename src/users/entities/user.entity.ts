import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';

import { User as PrismaUser } from 'prisma/prisma-client';

@ObjectType()
export class User implements PrismaUser {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  createdAt: Date;

  @HideField()
  password: string;

  @HideField()
  salt: string;
}
