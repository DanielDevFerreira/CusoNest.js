import { IsDate, IsEmail, IsEmpty, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    /**
     *  As senhas conterão pelo menos 1 letra maiúscula.
        As senhas conterão pelo menos 1 letra minúscula.
        As senhas conterão pelo menos 1 número ou caractere especial.
        Não há validação de comprimento (min, max) neste regex!.
     */
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message: 'password is valid'
    })
    password: string;

    dt_create: Date;
}