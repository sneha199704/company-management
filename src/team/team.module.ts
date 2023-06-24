import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Team]),],
  controllers: [TeamController],
  providers: [TeamService]
})
export class TeamModule {}
