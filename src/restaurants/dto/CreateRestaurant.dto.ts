import { ApiProperty } from "@nestjs/swagger";

export class CreateRestaurantDto {
  @ApiProperty({ example: "Test Restaurant" })
  name: string;

  @ApiProperty({ example: "123 Test St, Texas" })
  address: string;

  @ApiProperty({ example: "A great place for delicious Italian food." })
  description: string;

  @ApiProperty({ example: "$$" })
  price_range: "$" | "$$" | "$$$" | "$$$$";

  @ApiProperty({ type: [String], example: ["italian", "pizza"] })
  tags: string[];

  @ApiProperty({ type: [String], example: ["Lunch", "Dinner"] })
  mealtimes: string[];

  @ApiProperty({ example: 37.77928 })
  lat: number;

  @ApiProperty({ example: -122.419236 })
  long: number;
}
