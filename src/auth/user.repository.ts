import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentiais.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const {username, email, password} = authCredentialsDto;

        //hash
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = this.create({username, email, password: hashedPassword});

        try {
            await this.save(user);
        } catch (error) {
            // se acontencer erro de duplicagem no username ou no email
            if(error.code === 'ER_DUP_ENTRY'){
                throw new ConflictException('Username or Email already exists');
            }else{
                throw new InternalServerErrorException();
            }
        }
        
    }
}
