import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { User } from "src/users/user.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class AuthService {

    private issuer = 'login';
    private audience = 'users';

    constructor (
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        @InjectModel(User)
        private userModel: typeof User,
        ){}

    createToken(user: User){
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            },
            {
                expiresIn: "7 days",
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience
            })
        }
    }
    checkToken(token: string){
        try{
            const data = this.jwtService.verify(token,{
                issuer: this.issuer,
                audience: this.audience
            });
            return data;
        }catch(err){
            throw new BadRequestException(err);
        }
    }

    isValidToken(token: string){
        try{
            this.checkToken(token);
            return true;
        }catch(er){
            return false;
        }
    }

    async login(email: string, password: string){
        const user = await this.userModel.findOne({
            where: {email}
        });

        if(!user){
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

        if(!await bcrypt.compare(password,user.password)){
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

        return this.createToken(user);
    }

    async forget(email: string){
        const user = await this.userModel.findOne({
            where: {email}
        });

        if(!user){
            throw new UnauthorizedException('E-mail está incorreto.');
            
        }

        //Enviar email
        return true;
    }

    async reset(password: string, token: string){
        // Validar o token
        const id = 0;

        await this.userModel.update(
            { password },
            { where: { id } }
        );
        const user = await this.userModel.findByPk(id);
        if(!user){
            throw new UnauthorizedException('Token inválido.'); 
        }
        return this.createToken(user);
    }

    async register(data: AuthRegisterDTO){

        const user =  await this.userService.create(data);

        return this.createToken(user);
    }
}