import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
  ) {}

  createTeam(teamParams: CreateTeamDto) {
    const newCompany = this.teamRepository.create(teamParams);
    return this.teamRepository.save(newCompany);
  }
}
