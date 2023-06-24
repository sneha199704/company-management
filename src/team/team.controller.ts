import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { TeamService } from 'src/team/team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @UsePipes(ValidationPipe)
  createTeam(@Body() createTeamDto: CreateTeamDto) {
    try {
      return this.teamService.createTeam(createTeamDto);
    } catch (error: any) {
      throw new HttpException(
        error?.message || 'Something went wrong',
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
