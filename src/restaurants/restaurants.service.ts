import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Restaurant } from "./restaurant.model";
import {
  Order,
  ORDER_FIELDS,
  RESTAURANT_FIELDS,
  RestaurantOrderBy,
} from "src/common/enums";
import { CreateRestaurantDto } from "./dto/CreateRestaurant.dto";
import { EditRestaurantDto } from "./dto/EditRestaurant.dto";

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

  async createRestaurant(dto: CreateRestaurantDto) {
    const existing = await this.restaurantRepository.findOne({
      where: { name: dto.name, address: dto.address },
    });

    if (existing) {
      throw new BadRequestException("Restaurant already exists.");
    }

    return await this.restaurantRepository.create(dto);
  }

  async editRestaurant(id: string, dto: EditRestaurantDto) {
    await this.restaurantRepository.update(dto, { where: { id } });
    return this.restaurantRepository.findByPk(id);
  }
}
