import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { messageConstants } from 'src/constants/messageConstant';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async createCompany(companyParams: CreateCompanyDto) {
    const company = await this.companyRepository.findOne({
      where: {
        companyName: companyParams?.companyName,
      },
    });

    if (company) {
      throw new HttpException(
        messageConstants.COMPANY_ALREADY_EXIST,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newCompany = this.companyRepository.create({
      ...companyParams,
      inceptionDate: new Date(),
    });
    return this.companyRepository.save(newCompany);
  }

  findCompanyById(id: string) {
    return this.companyRepository.findOne({
      where: {
        id,
      },
    });
  }

  getCompaniesByName(name: string) {
    return this.companyRepository
      .createQueryBuilder('company')
      .where('LOWER(company.companyName) LIKE LOWER(:name)', {
        name: `${name}%`,
      })
      .getMany();
  }

  async getCompanyByTeam() {
    return await this.companyRepository.find({
      relations: ['teams'],
    });
  }
}
