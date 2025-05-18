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
    const res = await this.repo.createColor(color);
    const newVar = {
      id: res.id,
      created_at: res.created_at,
      name: res.c_name,
      hex: res.c_hex,
      rgb: res.c_rgb,
    };
    debugger;
    return newVar;
  }
}
