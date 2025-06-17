import { ApiProperty } from "@nestjs/swagger";
import { UUIDV4 } from "sequelize";
import { UUID } from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({
  tableName: "users",
})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({
    example: "uuid",
  })
  @Column({
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  })
  declare id: number;

  @ApiProperty({
    example: "test@gmail.com",
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: "strongpassword123",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: "fake_name",
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;
}
