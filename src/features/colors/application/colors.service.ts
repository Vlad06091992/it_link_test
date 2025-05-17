import { Inject, Injectable } from '@nestjs/common';
import { ColorsRepository } from 'src/features/colors/infrastructure/colors.repository';

@Injectable()
export class ColorsService {
  constructor(@Inject() protected usersRepository: ColorsRepository) {}
}
