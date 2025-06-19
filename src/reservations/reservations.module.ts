import { forwardRef, Module } from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { ReservationsController } from "./reservations.controller";
import { Reservation } from "./reservation.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { Restaurant } from "src/restaurants/restaurant.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [ReservationsService],
  controllers: [ReservationsController],
  imports: [
    SequelizeModule.forFeature([Reservation]),
    forwardRef(() => Restaurant),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET,
        signOptions: { expiresIn: "24h" },
      }),
    }),
  ],
})
export class ReservationsModule {}
