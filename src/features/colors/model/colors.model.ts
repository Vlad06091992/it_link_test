import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
@ObjectType()
export class Colors {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  rgb: string;

  @Field()
  hex: string;

  @Field()
  created_at: Date;
}

@InputType()
export class ColorCreateOrUpdateDTO {
  @Field()
  name: string;

  @Field()
  rgb: string;

  @Field()
  hex: string;
}
