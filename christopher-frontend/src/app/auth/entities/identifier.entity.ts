import { IsEmail, IsOptional, IsPhoneNumber, IsString, Matches } from 'class-validator';
import { BaseEntity } from '../../util/entities/base.entity';

export class Identifier extends BaseEntity {
  @Matches(/^[A-Za-z_]\w{5,15}$/)
  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;

  @IsPhoneNumber('US')
  @IsString()
  @IsOptional()
  telephone?: string;
}
