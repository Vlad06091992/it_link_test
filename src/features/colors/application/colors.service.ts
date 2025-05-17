import { Inject, Injectable } from '@nestjs/common';
import { ColorsRepository } from '../infrastructure/colors.repository';
import { ColorCreateOrUpdateDTO } from '../model/colors.model';

@Injectable()
export class ColorsService {
  constructor(@Inject() protected repo: ColorsRepository) {}

  async findAll() {
    return await this.repo.findAll();
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
    return await this.repo.createColor(color);
  }
}
