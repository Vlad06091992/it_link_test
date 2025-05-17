import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { InputType } from '@nestjs/graphql';

@Entity({ name: 'v_color' })
export class ColorsEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  c_name: string;

  @Column()
  c_hex: string;

  @Column()
  c_rgb: string;

  @Column()
  created_at: Date;
}
