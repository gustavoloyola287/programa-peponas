import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class loginDto {
    
    @IsEmail()    
    email: string;
    
    @Transform(({ value }) => value.trim()) 
    @MinLength(6)
    @IsString()
    password: string;
}