import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from '../service/auth/auth.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super();
    }
}