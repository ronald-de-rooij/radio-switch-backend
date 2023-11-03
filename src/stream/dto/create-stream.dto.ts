import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateStreamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  streamUrl: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  category?: 'RADIO';
}
