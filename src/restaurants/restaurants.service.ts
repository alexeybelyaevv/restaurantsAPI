import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRestaurantDto } from "./dto/CreateRestaurant.dto";
import { EditRestaurantDto } from "./dto/EditRestaurant.dto";
import { Order, RestaurantOrderBy } from "src/common/enums";
import { Restaurant } from "generated/prisma";

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async findRestaurants(
    page = 1,
    limit = 10,
    search = "",
    field?: RestaurantOrderBy,
    order?: Order
  ) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const skip = (safePage - 1) * safeLimit;

    if (!search || search.trim().length === 0) {
      const [total, data] = await this.prisma.$transaction([
        this.prisma.restaurant.count(),
        this.prisma.restaurant.findMany({
          take: safeLimit,
          skip,
          orderBy: field && order ? { [field]: order } : {},
        }),
      ]);

      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / safeLimit),
      };
    }

    const searchTerm = search.trim();

    const data = await this.prisma.$queryRaw<
      Array<Restaurant & { rank: number }>
    >`
      SELECT *,
        GREATEST(
          similarity(name, ${searchTerm}),
          similarity(address, ${searchTerm}),
          similarity(description, ${searchTerm})
        ) AS rank
      FROM "Restaurant"
      WHERE
        name % ${searchTerm}
        OR address % ${searchTerm}
        OR description % ${searchTerm}
      ORDER BY rank DESC
      LIMIT ${safeLimit} OFFSET ${skip}
    `;

    const total = await this.prisma.$queryRawUnsafe<number>(`
      SELECT COUNT(*)::int
      FROM "Restaurant"
      WHERE
        name % '${searchTerm}'
        OR address % '${searchTerm}'
        OR description % '${searchTerm}'
    `);

    return {
      data,
      total: total?.[0]?.count || 0,
      page,
      pageCount: Math.ceil((total?.[0]?.count || 0) / safeLimit),
    };
  }

  async createRestaurant(dto: CreateRestaurantDto) {
    const existing = await this.prisma.restaurant.findFirst({
      where: { name: dto.name, address: dto.address },
    });

    if (existing) {
      throw new BadRequestException("Restaurant already exists.");
    }

    return await this.prisma.restaurant.create({
      data: dto,
    });
  }

  async editRestaurant(id: string, dto: EditRestaurantDto) {
    const updated = await this.prisma.restaurant.update({
      where: { id },
      data: dto,
    });

    return updated;
  }
}
