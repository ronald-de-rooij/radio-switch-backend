import { IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  password?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
