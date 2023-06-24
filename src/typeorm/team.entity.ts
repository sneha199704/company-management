import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class Team {
  @Column()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: 'uuid',
  })
  companyId: string;

  @Column({
    nullable: false,
    default: '',
  })
  teamLeadName: string;

  // @ManyToOne(type => Company, company => company.teams) company: Company; 

  @ManyToOne((type) => Company, (company) => company.teams, {
    cascade: true,
  })
  @JoinTable()
  company: Company[]

}
