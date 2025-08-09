import { IsDateString, IsEmail, IsOptional, IsString } from "class-validator";

export class AuthLoginDTO{
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsDateString()
    birtAt: string;
}