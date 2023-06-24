import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';
import { CompanyService } from 'src/company/company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @UsePipes(ValidationPipe)
  createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findUsersById(@Param('id') id: string) {
    try {
      return this.companyService.findCompanyById(id);
    } catch (error: any) {
      throw new HttpException(
        error?.message || 'Something went wrong',
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  searchCompanyByName(@Query('name') name: string) {
    try {
      return this.companyService.getCompaniesByName(name);
    } catch (error: any) {
      throw new HttpException(
        error?.message || 'Something went wrong',
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('teams/all')
  getCompanyByTeams() {
    try {
      return this.companyService.getCompanyByTeam();
    } catch (error: any) {
      console.log('error', error);
      throw new HttpException(
        error?.message || 'Something went wrong',
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
