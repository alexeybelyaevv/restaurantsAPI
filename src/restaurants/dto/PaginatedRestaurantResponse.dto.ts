import { ApiProperty } from "@nestjs/swagger";
import { RestaurantResponseDto } from "./RestaurantResponse.dto";

export class PaginatedRestaurantsResponseDto {
  @ApiProperty({
    type: [RestaurantResponseDto],
    description: "List of restaurants",
  })
  data: RestaurantResponseDto[];

  @ApiProperty({ example: 100, description: "Total number of restaurants" })
  total: number;

  @ApiProperty({ example: 1, description: "Current page number" })
  page: number;

  @ApiProperty({ example: 10, description: "Total number of pages" })
  pageCount: number;
}
