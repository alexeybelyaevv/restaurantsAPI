import { ApiProperty } from "@nestjs/swagger";
import { RestaurantResponseDto } from "./RestaurantResponse.dto";

export class PaginatedRestaurantsResponseDto {
  @ApiProperty({ type: [RestaurantResponseDto] })
  data: RestaurantResponseDto[];

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  pageCount: number;
}
