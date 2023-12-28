import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Actor extends Model<Actor> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  photo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  slug: string;
}
