import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TokenController } from './token.controller';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
    // permite depender, injetar ou injetar a dependência
    imports:[
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([TokenRepository])],
    controllers:[TokenController],
    providers:[TokenService],
    exports: [TokenService]
})
export class TokenModule {}
