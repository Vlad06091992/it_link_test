import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ColorsService } from 'src/features/colors/application/colors.service';
import { Colors } from '../model/colors.model';
import { Inject } from '@nestjs/common';
import { ColorCreateOrUpdateDTO } from '../model/colors.model';

@Resolver(() => Colors)
export class ColorsResolver {
  constructor(@Inject() private colorsService: ColorsService) {}

  // @Query(() => [Colors])
  // async getColors(@Args('page', { defaultValue: 1 }) page: number) {
  //   return this.colorsService.findAllPaginated(page);
  // }

  @Query(() => [Colors])
  async getAllColors() {
    debugger;
    return await this.colorsService.findAll();
  }

  @Query(() => Colors)
  async findColorByName(@Args('name') name: string) {
    return this.colorsService.findColorByName(name);
  }

  @Mutation(() => Boolean)
  async removeColorById(@Args('id') id: number) {
    return await this.colorsService.removeColorById(id);
  }

  @Mutation(() => Colors)
  async addColor(@Args('colorData') colorData: ColorCreateOrUpdateDTO) {
    return await this.colorsService.createColor(colorData);
  }

  @Mutation(() => Boolean)
  async updateColorById(
    @Args('id') id: number,
    @Args('colorUpdateDTO') colorUpdateDTO: ColorCreateOrUpdateDTO,
  ) {
    return await this.colorsService.updateColorById(colorUpdateDTO, id);
  }
}
