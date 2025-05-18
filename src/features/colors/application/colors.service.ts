import { Inject, Injectable } from '@nestjs/common';
import { ColorsRepository } from '../infrastructure/colors.repository';
import { ColorCreateOrUpdateDTO } from '../model/colors.model';

@Injectable()
export class ColorsService {
  constructor(@Inject() protected repo: ColorsRepository) {}

  async findAll(pageNumber: number) {
    return await this.repo.findAll(pageNumber);
  }

  async findColorByName(name: string) {
    return await this.repo.findByName(name);
  }

  async updateColorById(data: ColorCreateOrUpdateDTO, id: number) {
    return await this.repo.updateById(data, id);
  }

  async removeColorById(id: number) {
    return await this.repo.removeById(id);
  }

  async createColor(color: ColorCreateOrUpdateDTO) {
    const { id, created_at, c_name, c_rgb, c_hex } =
      await this.repo.createColor(color);
    const output = {
      id,
      created_at,
      name: c_name,
      hex: c_hex,
      rgb: c_rgb,
    };
    return output;
  }
}
