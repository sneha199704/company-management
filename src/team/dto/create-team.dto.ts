import { IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  companyId: string;

  @IsNotEmpty()
  teamLeadName: string;
}
