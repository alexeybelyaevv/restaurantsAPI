import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { Reservation } from "../reservations/reservation.model";

interface RestaurantCreationAttrs {
  name: string;
  address: string;
  description: string;
  price_range: "$" | "$$" | "$$$" | "$$$$";
  tags: string[];
  mealtimes: string[];
  lat: number;
  long: number;
}

@Table({
  tableName: "restaurants",
})
export class Restaurant extends Model<Restaurant, RestaurantCreationAttrs> {
  @ApiProperty()
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ApiProperty()
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @ApiProperty({ example: "$$" })
  @Column({
    type: DataType.ENUM("$", "$$", "$$$", "$$$$"),
    allowNull: false,
    defaultValue: "$",
  })
  price_range: "$" | "$$" | "$$$" | "$$$$";

  @ApiProperty({ type: [String] })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  tags: string[];

  @ApiProperty({ type: [String] })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  mealtimes: string[];

  @ApiProperty()
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  lat: number;

  @ApiProperty()
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  long: number;

  @HasMany(() => Reservation)
  reservations: Reservation[];
}
