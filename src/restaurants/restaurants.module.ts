import { forwardRef, Module } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { RestaurantsController } from "./restaurants.controller";
import { Restaurant } from "./restaurant.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { Reservation } from "src/reservations/reservation.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [RestaurantsService],
  controllers: [RestaurantsController],
  imports: [
    SequelizeModule.forFeature([Restaurant]),
    forwardRef(() => Reservation),
    JwtModule,
  ],
})
export class RestaurantsModule {}
