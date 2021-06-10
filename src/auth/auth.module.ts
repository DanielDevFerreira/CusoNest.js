import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';

@Module({
    imports:[

    ],
    providers:[

    AuthService],
    controllers:[
        
    AuthController]
})
export class AuthModule {}
