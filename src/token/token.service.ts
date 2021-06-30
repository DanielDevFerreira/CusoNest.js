/* eslint-disable prettier/prettier */
import { Injectable} from '@nestjs/common';
import { TokenRepository } from './token.repository';



@Injectable()
export class TokenService {
   constructor(
       private tokenRepository: TokenRepository,
   ){}

   async saveToken(token:string, email:string){
       await this.tokenRepository.save({
            token: token,
            email: email
       })
   }
}
