import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Restaurant } from "./restaurant.model";
import {
  Order,
  ORDER_FIELDS,
  RESTAURANT_FIELDS,
  RestaurantOrderBy,
} from "src/common/enums";

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant) private restaurantRepository: typeof Restaurant
  ) {}

  async findRestaurants(
    page = 1,
    limit = 10,
    field: RestaurantOrderBy = RESTAURANT_FIELDS.createdAt,
    order: Order = ORDER_FIELDS.DESC
  ) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const offset = (safePage - 1) * safeLimit;

    const { rows, count } = await this.restaurantRepository.findAndCountAll({
      limit: safeLimit,
      offset,
      order: [[field, order]],
    });

    return {
      data: rows,
      total: count,
      page,
      pageCount: Math.ceil(count / limit),
    };
  }
}
