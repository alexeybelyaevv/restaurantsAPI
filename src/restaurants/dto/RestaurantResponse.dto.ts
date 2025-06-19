import { ApiProperty } from "@nestjs/swagger";
import { PriceRange } from "@prisma/client";

export class RestaurantResponseDto {
  @ApiProperty({
    example: "de305d54-75b4-431b-adb2-eb6b9e546013",
    description: "Restaurant ID (UUID)",
  })
  id: string;

  @ApiProperty({ example: "Test Restaurant", description: "Restaurant name" })
  name: string;

  @ApiProperty({
    example: "123 Test St, Texas",
    description: "Restaurant address",
  })
  address: string;

  @ApiProperty({
    example: "A great place for delicious Italian food.",
    description: "Restaurant description",
  })
  description: string;

  @ApiProperty({
    example: PriceRange.CHEAP,
    description: "Restaurant price range",
  })
  priceRange: PriceRange;

  @ApiProperty({
    type: [String],
    example: ["italian", "pizza"],
    description: "Tags associated with the restaurant",
  })
  tags: string[];

  @ApiProperty({
    type: [String],
    example: ["Lunch", "Dinner"],
    description: "Available mealtimes",
  })
  mealtimes: string[];

  @ApiProperty({ example: 37.77928, description: "Latitude coordinate" })
  lat: number;

  @ApiProperty({ example: -122.419236, description: "Longitude coordinate" })
  long: number;
}
