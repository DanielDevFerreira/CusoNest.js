import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentiais.dto';
import { UserRepository } from './user.repository';
import * as bcript from 'bcrypt';
import { AuthCredentialsSignInDto } from './dto/auth-credentiais-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-interface/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor( 
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository,
        private jwtService: JwtService
    ){}

    // método para criar usuario, implementado no repository
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.usersRepository.createUser(authCredentialsDto);
    }

    // método para gerar o token em cima do login
    async signIn(authCredentialsSignInDto: AuthCredentialsSignInDto): Promise<{ acessToken: string }>{
        const { email, password } = authCredentialsSignInDto;
        // verificar se o email existe 
        const user = await this.usersRepository.findOne({ email });

        //caso o email exista e a senha esteja correto 
        if(user && (await bcript.compare(password, user.password))){
            // geraldo o token para o cliente
            const payload: JwtPayload = { email };
            const acessToken = await this.jwtService.sign(payload);
            return { acessToken };
        }else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
