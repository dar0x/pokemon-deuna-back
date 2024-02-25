import { IsNumber, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit: number;

  @IsNumber()
  @IsPositive()
  offset: number;
}
