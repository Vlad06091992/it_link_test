import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
