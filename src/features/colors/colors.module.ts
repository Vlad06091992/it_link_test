import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsResolver } from './api/colors.resolver';
import { ColorsService } from './application/colors.service';
import { ColorsEntity } from './entity/colors.entity';

import { ColorsRepository } from './infrastructure/colors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ColorsEntity])],
  providers: [ColorsResolver, ColorsService, ColorsRepository],
})
export class ColorsModule {}
