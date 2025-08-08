import { Column, DataType, Model  } from "sequelize-typescript";
import { Attributes, FindOptions, ModelStatic } from "sequelize";


export class BaseModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number; 
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
   declare updatedAt: Date;

  static async save(instance){
    try {
            return await instance.save();
        } catch (error) {
            console.error('Error saving instance:', error);
            throw new Error(`Error trying to save that model: ${error.message}`); 
        }
    }

    static async update(instance, data){
        try {
            return await instance.update({ ...data});
        } catch (error) {
            console.error('Error updating instance:', error);
            throw new Error(`Error trying to update that model: ${error.message}`); 
        }
    }

    public static async findOneOrThrow<M extends Model>(
    this: ModelStatic<M>,
    options?: FindOptions<Attributes<M>>,
    ): Promise<M> {
        const instance = await this.findOne(options);
        if (!instance) {
            throw new Error(`Instance not found with options: ${JSON.stringify(options)}`);
        }
        return instance;
    }
   
}