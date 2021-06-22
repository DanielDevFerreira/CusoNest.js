import { HttpStatus } from '@nestjs/common';
import { Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthCredentialsSignInDto } from './dto/auth-credentiais-signin.dto';
import { AuthCredentialsDto } from './dto/auth-credentiais.dto';

@Controller('auth')
export class AuthController {
    constructor( 
        private authService: AuthService,
        private jwtService: JwtService
    ){}

    @Post('signup')
    signUp(@Body() authCrendentalsDto: AuthCredentialsDto): Promise<void>{
        return this.authService.signUp(authCrendentalsDto);
    }
    
    @Post('signin')
    async signIn(@Body() authCredentialsSignInDto: AuthCredentialsSignInDto, @Res({passthrough: true}) response: Response){
        const token =  await this.authService.signIn(authCredentialsSignInDto);

        // response.cookie('token', token, {httpOnly: true});

        response.status(HttpStatus.OK).json({
            message: "Login Efetuado com Sucesso",
            token: token
        })    
    }
}
