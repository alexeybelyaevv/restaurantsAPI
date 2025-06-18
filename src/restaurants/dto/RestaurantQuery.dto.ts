import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsPositive } from "class-validator";
import { Type } from "class-transformer";
import {
  ORDER_FIELDS,
  Order,
  RESTAURANT_FIELDS,
  RestaurantOrderBy,
} from "../../common/enums";

export class RestaurantsQueryDto {
  @ApiPropertyOptional({ example: 1, description: "Page number (1-based)" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: "Items per page" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number = 10;

  @ApiPropertyOptional({
    example: ORDER_FIELDS.DESC,
    enum: Object.values(ORDER_FIELDS),
    description: "Sort order",
  })
  @IsOptional()
  @IsEnum(ORDER_FIELDS)
  order?: Order = ORDER_FIELDS.DESC;

  @ApiPropertyOptional({
    example: "createdAt",
    enum: RESTAURANT_FIELDS,
    description: "Field to sort by",
  })
  @IsOptional()
  @IsEnum(RESTAURANT_FIELDS)
  field?: RestaurantOrderBy = "createdAt";
}
