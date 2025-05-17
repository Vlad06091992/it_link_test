import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
@ObjectType()
export class Colors {
  @Field(() => ID)
  id: string;

  @Field()
  c_name: string;

  @Field()
  c_rgb: string;

  @Field()
  c_hex: string;

  @Field()
  created_at: string;
}

@InputType()
export class ColorCreateOrUpdateDTO {
  @Field()
  c_name: string;

  @Field()
  c_rgb: string;

  @Field()
  c_hex: string;
}
