import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { messageConstants } from 'src/constants/messageConstant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async login(userParams: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: userParams?.username
      }
    });
    
    if (!user) {
      throw new HttpException(messageConstants.USER_NOT_EXIST, HttpStatus.UNAUTHORIZED);
    }

    if (user?.password !== userParams?.password) {
      throw new HttpException(messageConstants.INCORRECT_PASSWORD, HttpStatus.UNAUTHORIZED);
    }

    // const newUser = this.userRepository.create(userParams);
    // return this.userRepository.save(newUser);

    return {
      ...user,
      access_token: await this.jwtService.signAsync({
        username: user?.username
      }),
    };
  }     
}