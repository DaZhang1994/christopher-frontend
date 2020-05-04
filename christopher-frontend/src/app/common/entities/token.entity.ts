import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { BaseEntity } from './base.entity';

export class Token extends BaseEntity{

  @IsString()
  @IsNotEmpty()
  username: string;

  @Matches(/^[0-9a-fA-F]{24}$/)
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsNumber()
  @IsNotEmpty()
  role: number;

  @IsNumber()
  @IsNotEmpty()
  iat: number;

  @IsNumber()
  @IsNotEmpty()
  exp: number;

}
