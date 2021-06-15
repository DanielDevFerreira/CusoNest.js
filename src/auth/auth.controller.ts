import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsSignInDto } from './dto/auth-credentiais-signin.dto';
import { AuthCredentialsDto } from './dto/auth-credentiais.dto';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}

    @Post('signup')
    signUp(@Body() authCrendentalsDto: AuthCredentialsDto): Promise<void>{
        return this.authService.signUp(authCrendentalsDto);
    }
    
    @Post('signin')
    signIn(@Body() authCredentialsSignInDto: AuthCredentialsSignInDto): Promise<{ acessToken: string }>{
        return this.authService.signIn(authCredentialsSignInDto);
    }
}
