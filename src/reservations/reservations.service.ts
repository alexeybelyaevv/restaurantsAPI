import { Injectable } from "@nestjs/common";

@Injectable()
export class ReservationsService {
  async findReservations(page: number = 1, limit: number = 10) {
    console.log(page, limit);
    return;
  }
}
