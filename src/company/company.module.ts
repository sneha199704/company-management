import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Company]),],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}