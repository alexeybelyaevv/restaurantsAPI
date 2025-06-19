import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsPositive } from "class-validator";
import { Type } from "class-transformer";
import { Prisma } from "generated/prisma";

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
    example: "desc",
    enum: ["asc", "desc"],
    description: "Sort order",
  })
  @IsOptional()
  @IsEnum(["asc", "desc"])
  order?: Prisma.SortOrder = "desc";

  @ApiPropertyOptional({
    example: "createdAt",
    enum: ["createdAt", "updatedAt", "name", "address", "priceRange"],
    description: "Field to sort by",
  })
  @IsOptional()
  field?: keyof Prisma.RestaurantOrderByWithRelationInput =
    "createdAt" as keyof Prisma.RestaurantOrderByWithRelationInput;
}
