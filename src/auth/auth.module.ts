import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";

@Module({
    imports: [
    JwtModule.register({
        secret: process.env.JWT_SECRET
    }),
    forwardRef(()=> UsersModule),
    ]
    ,
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule {

}