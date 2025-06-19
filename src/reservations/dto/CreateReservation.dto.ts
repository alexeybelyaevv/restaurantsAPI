import { ApiProperty } from "@nestjs/swagger";
import {
  IsUUID,
  IsDateString,
  IsString,
  IsInt,
  Min,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";

class PriceDto {
  @ApiProperty({ example: 5000 })
  @IsInt()
  @Min(0)
  amount: number;

  @ApiProperty({ example: 6000 })
  @IsInt()
  @Min(0)
  included_amount: number;
}

export class CreateReservationDto {
  @ApiProperty({ example: "2024-03-25T19:00:00Z" })
  @IsDateString()
  start: string;

  @ApiProperty({ example: "2024-03-25T21:00:00Z" })
  @IsDateString()
  end: string;

  @ApiProperty({ example: "f223e8d7-ccef-4f90-8bbf-738d2f238b0e" })
  @IsUUID()
  restaurantId: string;

  @ApiProperty({
    example: { amount: 5000, included_amount: 6000 },
    type: PriceDto,
  })
  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto;

  @ApiProperty({ example: "Dinner" })
  @IsString()
  mealtime: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  size: number;

  @ApiProperty({ example: "xyz" })
  @IsString()
  @IsOptional()
  details?: string;
}
