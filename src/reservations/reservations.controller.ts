import { ReservationsService } from "./reservations.service";
import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Order, ORDER_FIELDS } from "src/common/enums";
import { PaginatedResponse } from "src/common/types";
import { ReservationResponseDto } from "./dto/ReservationsResponse.dto";

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
  findRestaurants(
    @Query("page") page?: number,
    @Query("limit") limit?: number
  ) {
    return this.reservationsService.findReservations(page, limit);
  }
}
