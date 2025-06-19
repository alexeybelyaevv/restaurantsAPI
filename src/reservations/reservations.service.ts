import { Injectable } from "@nestjs/common";
import { Order, ReservationOrderBy } from "src/common/enums";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReservationDto } from "./dto/CreateReservation.dto";

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async findReservations(
    page = 1,
    limit = 10,
    restaurantId?: string,
    field?: ReservationOrderBy,
    order?: Order
  ) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const skip = (safePage - 1) * safeLimit;

    const where = restaurantId ? { restaurantId } : {};

    const [total, data] = await this.prisma.$transaction([
      this.prisma.reservation.count({
        where,
      }),
      this.prisma.reservation.findMany({
        where,
        take: safeLimit,
        skip,
        orderBy: field && order ? { [field]: order } : { createdAt: "desc" },
      }),
    ]);

    return {
      data,
      total,
      page,
      pageCount: Math.ceil(total / safeLimit),
    };
  }

  async createReservation(dto: CreateReservationDto) {
    const reservation = await this.prisma.reservation.create({
      data: {
        start: new Date(dto.start),
        end: new Date(dto.end),
        restaurantId: dto.restaurantId,
        price: {
          amount: dto.price.amount,
          included_amount: dto.price.included_amount,
        },
        mealtime: dto.mealtime,
        size: dto.size,
        details: dto.details,
      },
    });

    return reservation;
  }
}
