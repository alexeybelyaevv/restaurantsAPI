import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEnum,
  IsArray,
  IsNumber,
  IsOptional,
} from "class-validator";
import { PriceRange } from "generated/prisma";

export class CreateRestaurantDto {
  @ApiProperty({ example: "Test Restaurant" })
  @IsString()
  name: string;

  @ApiProperty({ example: "123 Test St, Texas" })
  @IsString()
  address: string;

  @ApiProperty({ example: "A great place for delicious Italian food." })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: PriceRange.CHEAP })
  @IsEnum(PriceRange)
  priceRange: PriceRange;

  @ApiProperty({ type: [String], example: ["italian", "pizza"] })
  @IsArray()
  tags: string[];

  @ApiProperty({ type: [String], example: ["Lunch", "Dinner"] })
  @IsArray()
  mealtimes: string[];

  @ApiProperty({ example: 37.77928 })
  @IsNumber()
  lat: number;

  @ApiProperty({ example: -122.419236 })
  @IsNumber()
  long: number;
}
