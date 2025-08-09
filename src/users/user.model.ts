import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { BaseModel } from 'src/database/base.model';


@Table({
  schema: 'public',
  tableName: 'users',
  timestamps: true,
})
export class User extends BaseModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  declare role: number;
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare birthAt?: Date | null;
}