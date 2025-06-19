import { ReservationsService } from "./reservations.service";
import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import {
  Order,
  ORDER_FIELDS,
  RESERVATION_FIELDS,
  ReservationOrderBy,
} from "src/common/enums";
import { PaginatedResponse } from "src/common/types";
import { ReservationResponseDto } from "./dto/ReservationsResponse.dto";
import { CreateReservationDto } from "./dto/CreateReservation.dto";

@Controller("reservations")
@UseGuards(JwtAuthGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiOperation({
    summary: "Get paginated restaurants",
  })
  @ApiResponse({
    status: 200,
    type: [PaginatedResponse<ReservationResponseDto>],
  })
  @Get()
  @ApiQuery({ name: "page", required: false, example: 1 })
  @ApiQuery({ name: "limit", required: false, example: 10 })
  @ApiQuery({
    name: "restaurantId",
    required: false,
    example: "2e8009a9-7629-4450-8126-4b288dbe5c39",
  })
  @ApiQuery({ name: "field", required: false, enum: RESERVATION_FIELDS })
  @ApiQuery({ name: "order", required: false, enum: ORDER_FIELDS })
  findRestaurants(
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("restaurantId") restaurantId?: string,
    @Query("field") field?: ReservationOrderBy,
    @Query("order") order?: Order
  ) {
    return this.reservationsService.findReservations(
      page,
      limit,
      restaurantId,
      field,
      order
    );
  }

  @Post()
  createRestaurant(@Body() dto: CreateReservationDto) {
    return this.reservationsService.createReservation(dto);
  }
}
