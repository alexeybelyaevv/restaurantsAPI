import { ApiProperty } from "@nestjs/swagger";

export class EditRestaurantDto {
  @ApiProperty({ example: "Test Restaurant" })
  name: string;

  @ApiProperty({ example: "A great place for delicious Italian food." })
  description: string;

  @ApiProperty({ example: "$$" })
  price_range: "$" | "$$" | "$$$" | "$$$$";

  @ApiProperty({ type: [String], example: ["italian", "pizza"] })
  tags: string[];

  @ApiProperty({ type: [String], example: ["Lunch", "Dinner"] })
  mealtimes: string[];
}
