import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterEmailDto {
    @IsString()
    @IsNotEmpty()
    email: string;
}
