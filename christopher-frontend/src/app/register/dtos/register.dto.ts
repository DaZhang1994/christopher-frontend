import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { BaseEntity } from '../../util/entities/base.entity';

export class RegisterDto extends BaseEntity {
  @Matches(/^[A-Za-z_]\w{5,15}$/)
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @Matches(/[a-fA-F0-9]{32}/)
  @IsString()
  password: string;

  @IsEmail()
  @IsString()
  email: string;

  @Matches(/[0-9]{10}/)
  @IsString()
  @IsOptional()
  telephone?: string;
}
