import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Restaurant } from "../restaurants/restaurant.model";

interface ReservationCreationAttrs {
  start: Date;
  end: Date;
  restaurant_id: string;
  price: {
    amount: number;
    included_amount: number;
  };
  mealtime: string;
  size: number;
  details: string;
}

@Table({
  tableName: "reservations",
})
export class Reservation extends Model<Reservation, ReservationCreationAttrs> {
  @ApiProperty()
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start: Date;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end: Date;

  @ApiProperty()
  @ForeignKey(() => Restaurant)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  restaurant_id: string;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @ApiProperty({
    example: {
      amount: 5000,
      included_amount: 6000,
    },
  })
  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  price: {
    amount: number;
    included_amount: number;
  };

  @ApiProperty({ example: "Dinner" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mealtime: string;

  @ApiProperty({ example: 10 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  size: number;

  @ApiProperty({ example: "xyz" })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  details: string;
}
