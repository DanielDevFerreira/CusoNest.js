import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
@Controller('auth')
export class AuthController {

    /**
     * Get /api/auth/login
     * This is the route the user will visit to authenticate
     */

   @Get('login')
   login(){
       return;
   }

   /**
    * Get /api/auth/redirect
    * This is the redirect URL the OAuth2 Provider will call.
    */

   @Get('redirect')
   redirect(@Res() res: Response){
       res.send(200) 
   }

   /**
    * Get /api/auth/status
    * Retrieve the auth status
    */

   @Get('status')
   status(){}

   /**
    * Get /api/auth/Logout
    * Logging the user out
    */

   @Get('logout')
   logout(){}
}
