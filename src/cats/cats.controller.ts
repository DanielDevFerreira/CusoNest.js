import { Body, Controller, Get, Header, HttpCode, Param, Post, Res, Response } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';


export interface CatsDto {
    username: string;
    password: string;
    email: string;
}

// sistema de rota, já incluído dentro decorador @controller
@Controller('cats')
export class CatsController {
    @Get()
    //Podemos acessar o objeto de solicitação instruindo o nest a injetá-lo
    //adicionando o @Req() decorador à assinatura do manipulador.
    findAll(): string {
        return 'This action returns all cats';
    }
    

    @Post()
    // alterar o status do http
    @HttpCode(203)
    @Header('Cache-Control', 'none')
    create(@Body() teste: CatsDto): string{
        console.log(teste);
        return'This action adds a new cat';
    }

    //testando parâmetro no rota
    // @Get(':id')
    // parametro(@Param() params): string {
    //     console.log(params.id);
    //     return `This action returns a ${params.id} cat`;
    // }
    
    @Get(':id')
    parametro2(@Param('id') id: string): string {
        console.log(id);
        return `This action returns a ${id} cat`;
    }

    // cada função assincrona deve retonar uma Promisse
    // @Get()
    // async find2All(): Promise<any[]>{
    //     return [];
    // }

}

