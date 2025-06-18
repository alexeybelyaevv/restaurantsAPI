import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserResponseDto } from "src/users/dto/user-response.dto";
import { Restaurant } from "./restaurant.model";
import { RestaurantsService } from "./restaurants.service";
import { Order, RestaurantOrderBy } from "src/common/enums";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RestaurantResponseDto } from "./dto/RestaurantResponse.dto";
import { PaginatedResponse } from "src/common/types";

@Controller("restaurants")
@UseGuards(JwtAuthGuard)
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @ApiOperation({
    summary: "Get paginated restaurants",
  })
  @ApiResponse({
    status: 200,
    type: [PaginatedResponse<RestaurantResponseDto>],
  })
  @Get()
  findRestaurants(
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("field") field?: RestaurantOrderBy,
    @Query("order") order?: Order
  ) {
    return this.restaurantsService.findRestaurants(page, limit, field, order);
  }
}
