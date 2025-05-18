import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Colors {
  @Field()
  id: number;

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
