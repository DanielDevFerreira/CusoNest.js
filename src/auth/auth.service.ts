import { ConflictException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentiais.dto';
import { UserRepository } from './user.repository';
import * as bcript from 'bcrypt';
import { AuthCredentialsSignInDto } from './dto/auth-credentiais-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-interface/jwt-payload.interface';
import * as nodemailer from 'nodemailer';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
    constructor( 
        @InjectRepository(UserRepository)
        @Inject(forwardRef(() => TokenService))
        private usersRepository: UserRepository,
        private jwtService: JwtService,
        private tokenService: TokenService
    ){}

    // método para criar usuario, implementado no repository
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const {username, email, password} = authCredentialsDto;

        const urlBase = 'http://localhost:3000';

        const userExist = await this.usersRepository.findOne({email});
    //    console.log(userExist);

        if(userExist){
            throw new ConflictException('Usuário ou Email já existente');
        } else {

            const acessToken = await this.jwtService.sign({username, email, password});

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                user: "daniel.ferreira@rastreei.com", // generated ethereal user
                pass: 'Dc15310593', // generated ethereal password
                },
            });

            // send mail with defined transport object
            const data = transporter.sendMail({
                from: '"Fred Foo 👻" <danielplay78@hotmail.com>', // sender address
                to: "danielplay78@hotmail.com, baz@example.com", // list of receivers
                subject: "Link para Ativação de Conta",
                text: "Hello world?", // plain text body
                html: `
                    <h2>Por favor, click no link para activar sua conta</h2>
                    <p>${urlBase}/authentication/ative/${acessToken}</p>
                `
            });

            // console.log("Message sent: %s", info.messageId);
            // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // // Preview only available when sending through an Ethereal account
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }
        
        //hash
        const salt = await bcript.genSalt();
        const hashedPassword = await bcript.hash(password, salt);
        
        const user = this.usersRepository.create({username, email, password: hashedPassword});
        await this.usersRepository.save(user);

        // try {
        //     await this.save(user);
        // } catch (error) {
        //     // se acontencer erro de duplicagem no username ou no email
        //     if(error.code === 'ER_DUP_ENTRY'){
        //         throw new ConflictException('Usuário ou Email já existente');
        //     }else{
        //         throw new InternalServerErrorException();
        //     }
        // }
        
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
