import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { RestaurantsService } from "./restaurants.service";
import {
  Order,
  ORDER_FIELDS,
  RESTAURANT_FIELDS,
  RestaurantOrderBy,
} from "src/common/enums";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RestaurantResponseDto } from "./dto/RestaurantResponse.dto";
import { PaginatedResponse } from "src/common/types";
import { CreateRestaurantDto } from "./dto/CreateRestaurant.dto";
import { EditRestaurantDto } from "./dto/EditRestaurant.dto";

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
  @ApiQuery({ name: "page", required: false, example: 1 })
  @ApiQuery({ name: "limit", required: false, example: 10 })
  @ApiQuery({ name: "field", required: false, enum: RESTAURANT_FIELDS })
  @ApiQuery({ name: "order", required: false, enum: ORDER_FIELDS })
  findRestaurants(
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("field") field?: RestaurantOrderBy,
    @Query("order") order?: Order
  ) {
    return this.restaurantsService.findRestaurants(page, limit, field, order);
  }

  @Post()
  createRestaurant(@Body() dto: CreateRestaurantDto) {
    return this.restaurantsService.createRestaurant(dto);
  }

  @ApiOperation({ summary: "Edit restaurant by id" })
  @ApiResponse({ status: 200, type: RestaurantResponseDto })
  @Patch(":id")
  editRestaurant(@Param("id") id: string, @Body() dto: EditRestaurantDto) {
    return this.restaurantsService.editRestaurant(id, dto);
  }
}
