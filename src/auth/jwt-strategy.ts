import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-interface/jwt-payload.interface";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

//definir a estratégia
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){
        super({
            secretOrKey: 'topSecre51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<User>{
        const { email } = payload;
        const user: User = await this.userRepository.findOne({ email });

        if(!user){
            throw new UnauthorizedException('User not authorized');
        }

        return user;
    }
}