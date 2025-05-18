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

  async findAll(pageNumber: number) {
    const skip = (+pageNumber - 1) * +5;

    const query = this.repo
      .createQueryBuilder('c')
      .select([
        'id',
        'c_name as name',
        'c_rgb as rgb',
        'c_hex as hex',
        'created_at',
      ]);

    if (pageNumber) {
      query.skip(+skip);
      query.take(+5);
    }

    query.orderBy('c.created_at', 'DESC');

    return await query.getRawMany();
  }

  async findByName(name: string) {
    return await this.repo
      .createQueryBuilder('c')
      .select([
        'id',
        'c_name as name',
        'c_rgb as rgb',
        'c_hex as hex',
        'created_at',
      ])
      .where('c.c_name = :name', { name })
      .getRawOne();
  }

  async updateById({ rgb, name, hex }: ColorCreateOrUpdateDTO, id: number) {
    const updateResult = await this.repo
      .createQueryBuilder('c')
      .update(ColorsEntity)
      .set({
        c_hex: hex,
        c_name: name,
        c_rgb: rgb,
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

  async createColor({ rgb, hex, name }: ColorCreateOrUpdateDTO): Promise<any> {
    const color = {
      ...{
        c_hex: hex,
        c_name: name,
        c_rgb: rgb,
      },
      created_at: new Date(),
    };
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
