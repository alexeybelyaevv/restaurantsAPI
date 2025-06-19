import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { ReservationsModule } from "./reservations/reservations.module";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    ReservationsModule,
    RestaurantsModule,
  ],
})
export class AppModule {}
