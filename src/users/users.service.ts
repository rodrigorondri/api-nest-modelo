import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from "bcrypt";
import { UpdatePutUserDTO } from "./dto/update-put.dto";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { User } from "./user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,) { }

  async create({ name, email, password, birthAt }: CreateUserDTO) {

    const salt = await bcrypt.genSalt();

    password = await bcrypt.hash(password, salt);

    return await this.userModel.create({
      name,
      email,
      password,
      birthAt: birthAt ? new Date(birthAt) : null
    });
  }

  async list() {
    return this.userModel.findAll();
  }

  async show(id: number) {
    await this.exist(id);
    return this.userModel.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, { email, name, password, birthAt, role }: UpdatePutUserDTO) {
    await this.exist(id);

    const salt = await bcrypt.genSalt();

    password = await bcrypt.hash(password, salt);
    

    return this.userModel.update(
      {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
        role
      },
      {
        where: {
          id
        }
      }
    );
  }

  async updatePartial(id: number, { email, name, password, birthAt, role }: UpdatePatchUserDTO) {
    await this.exist(id);

    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      const salt = await bcrypt.genSalt();

      data.password = await bcrypt.hash(password, salt);
    }

    if (role) {
      data.role = role;
    }


    return this.userModel.update(
      data,
      {
        where: {
          id
        }
      }
    );
  }

  async delete(id: number) {
    await this.exist(id);
    return this.userModel.destroy({
      where: {
        id
      }
    });
  }

  async exist(id: number) {
    if (!(await this.userModel.count({
      where: { id }
    }))) {

      throw new NotFoundException(`O usuario ${id} não existe.`);
    }
  }
}