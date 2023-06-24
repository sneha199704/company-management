import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from './team.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  companyName: string;

  @Column({
    nullable: false,
    default: '',
  })
  ceoName: string;

  @Column({
    nullable: false,
    default: '',
  })
  address: string;

  @Column({
    nullable: true,
  })
  inceptionDate: Date;

  @OneToMany(type => Team, team => team.company) teams: Team[];
}
