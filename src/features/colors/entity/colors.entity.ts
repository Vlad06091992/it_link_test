import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'v_color' })
export class ColorsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  c_name: string;

  @Column()
  c_hex: string;

  @Column()
  c_rgb: string;

  @Column()
  createdAt: Date;
}
