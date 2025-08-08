import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

@Table({
  tableName: 'users',
  timestamps: false, // ou false conforme sua necessidade
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number; // Usando declare para propriedades herdadas

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
}