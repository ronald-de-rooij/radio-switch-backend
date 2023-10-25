import { IsNotEmpty, IsString } from 'class-validator';

export class StreamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  image: string;

  @IsString()
  category: string;
}
