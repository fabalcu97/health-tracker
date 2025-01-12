import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field(() => String)
  email: string;

  @Field()
  password: string;
}
