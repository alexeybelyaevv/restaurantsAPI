import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Order, ReservationOrderBy } from "src/common/enums";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReservationDto } from "./dto/CreateReservation.dto";
import { ReservationStatus } from "@prisma/client";

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

  async addToCart(id: string, userId: string) {
    const updated = await this.prisma.reservation.updateMany({
      where: { id, status: ReservationStatus.free },
      data: {
        status: ReservationStatus.pending,
        userId,
      },
    });

    if (updated.count === 0) {
      const exists = await this.prisma.reservation.count({ where: { id } });
      if (!exists) {
        throw new NotFoundException("Reservation not found");
      }
      throw new BadRequestException("Reservation is no longer available");
    }

    return this.prisma.reservation.findUnique({ where: { id } });
  }

  async createReservation(dto: CreateReservationDto) {
    const existingRestaurant = await this.prisma.restaurant.findUnique({
      where: { id: dto.restaurantId },
    });
    if (!existingRestaurant) {
      throw new NotFoundException(
        `Restaurant with id ${dto.restaurantId} not found.`
      );
    }

    const reservation = await this.prisma.reservation.create({
      data: {
        start: new Date(dto.start),
        end: new Date(dto.end),
        price: {
          amount: dto.price.amount,
          included_amount: dto.price.included_amount,
        },
        mealtime: dto.mealtime,
        size: dto.size,
        details: dto.details,
        restaurant: {
          connect: { id: dto.restaurantId },
        },
      },
    });

    return reservation;
  }

  async getMyReservations(userId: string) {
    if (!userId) {
      throw new BadRequestException("User ID is required");
    }

    const reservations = await this.prisma.reservation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return reservations;
  }
}
