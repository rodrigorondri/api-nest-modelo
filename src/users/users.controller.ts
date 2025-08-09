import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";

import { Role } from "src/enums/role.enum";
import { RoleGuard } from "../guards/role.guards";
import { AuthGuard } from "../guards/auth.guards";
import { SkipThrottle } from "@nestjs/throttler";
import { CreateUserDTO, UpdatePatchUserDTO, UpdatePutUserDTO } from "./dto";
import { ParamId, Roles } from "src/decorators";
import { UserService } from "./users.service";


@Roles(Role.Admin)
@UseGuards(AuthGuard,RoleGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() data: CreateUserDTO){
        console.log(data);
        return await this.userService.create(data);
    }

    @SkipThrottle()
    @Roles(Role.User)
    @Get()
    async list(){
        return await this.userService.list();
    }

    @Get(':id')
    async show(@ParamId() id: number){
        return await this.userService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutUserDTO,@Param('id',ParseIntPipe) id: number){
        return this.userService.update(id,data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @Param('id',ParseIntPipe) id: number){
        return this.userService.updatePartial(id,data);
    }

    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id: number){
        return await this.userService.delete(id);
    }
}