import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guards";
import { User } from "src/decorators/use.decorator";
import { AuthForgetDTO, AuthLoginDTO, AuthRegisterDTO, AuthResetDTO } from "./dto";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
        ){

    }

    @Post('login')
    async login(@Body() {email,password}: AuthLoginDTO){
        return this.authService.login(email,password);
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO){
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO){
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {password,token}: AuthResetDTO){
        return this.authService.reset(password,token);
    }
    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User('email') user){
        return {user: user};
    }
}