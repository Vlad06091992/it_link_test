import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColorsEntity } from 'src/features/colors/entity/colors.entity';

@Injectable()
export class ColorsRepository {
  constructor(
    @InjectRepository(ColorsEntity) private repo: Repository<ColorsEntity>,
  ) {}
}
