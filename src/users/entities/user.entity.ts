import { ObjectType, Field, Int } from '@nestjs/graphql';

import { User as PrismaUser } from 'prisma/prisma-client';

@ObjectType()
export class User implements PrismaUser {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String)
  createdAt: Date;
}
