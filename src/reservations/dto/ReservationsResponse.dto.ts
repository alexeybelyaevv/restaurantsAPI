import { ApiProperty } from "@nestjs/swagger";

export class ReservationResponseDto {
  @ApiProperty({ example: "c1d1a7b3-8a76-4e12-bb12-ccb123456789" })
  id: string;

  @ApiProperty({ example: "2024-03-25T19:00:00Z" })
  start: Date;

  @ApiProperty({ example: "2024-03-25T21:00:00Z" })
  end: Date;

  @ApiProperty({ example: "c1d1a7b3-8a76-4e12-bb12-ccb123456789" })
  restaurant_id: string;

  @ApiProperty({
    example: {
      amount: 5000,
      included_amount: 6000,
    },
  })
  price: {
    amount: number;
    included_amount: number;
  };

  @ApiProperty({ example: "Dinner" })
  mealtime: string;

  @ApiProperty({ example: 10 })
  size: number;

  @ApiProperty({ example: "xyz" })
  details: string;
}
