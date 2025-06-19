import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsEnum, IsArray } from "class-validator";
import { PriceRange } from "generated/prisma";

export class EditRestaurantDto {
  @ApiPropertyOptional({ example: "Test Restaurant" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: "A great place for delicious Italian food." })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: PriceRange.CHEAP, enum: PriceRange })
  @IsOptional()
  @IsEnum(PriceRange)
  priceRange?: PriceRange;

  @ApiPropertyOptional({ type: [String], example: ["italian", "pizza"] })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiPropertyOptional({ type: [String], example: ["Lunch", "Dinner"] })
  @IsOptional()
  @IsArray()
  mealtimes?: string[];
}
