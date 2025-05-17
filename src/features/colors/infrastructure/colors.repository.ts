import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColorsEntity } from '../entity/colors.entity';
import { ColorCreateOrUpdateDTO } from '../model/colors.model';

@Injectable()
export class ColorsRepository {
  constructor(
    @InjectRepository(ColorsEntity) private repo: Repository<ColorsEntity>,
  ) {}

  async findAll() {
    return await this.repo.createQueryBuilder('c').getMany();
  }

  async findByName(name: string) {
    return await this.repo
      .createQueryBuilder('c')
      .where('c.c_name = :name', { name })
      .getOne();
  }

  async updateById(
    { c_rgb, c_name, c_hex }: ColorCreateOrUpdateDTO,
    id: number,
  ) {
    const updateResult = await this.repo
      .createQueryBuilder('c')
      .update(ColorsEntity)
      .set({
        c_hex,
        c_name,
        c_rgb,
      })
      .where('id = :id', { id })
      .execute();
    return updateResult.affected > 0;
  }

  async removeById(id: number) {
    const deleteResult = await this.repo
      .createQueryBuilder()
      .delete()
      .from(ColorsEntity)
      .where('id = :id', { id })
      .execute();
    console.log(deleteResult);
    return deleteResult.affected > 0;
  }

  async createColor(colorData: ColorCreateOrUpdateDTO): Promise<any> {
    const color = { ...colorData, created_at: new Date() };
    const insertResult = await this.repo
      .createQueryBuilder()
      .insert()
      .into(ColorsEntity)
      .values([color])
      .returning('*')
      .execute();
    return insertResult.raw[0];
  }
}
