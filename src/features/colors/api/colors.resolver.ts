import { Resolver } from '@nestjs/graphql';
import { ColorsService } from 'src/features/colors/application/colors.service';
import { Colors } from './model/colors.model';
import { Inject } from '@nestjs/common';

@Resolver(() => Colors)
export class ColorsResolver {
  constructor(@Inject() private colorsService: ColorsService) {}
}
