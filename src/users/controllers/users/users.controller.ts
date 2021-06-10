import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { UserDto } from 'src/users/dto/User';
import { IUserService } from 'src/users/service/user/user';

@Controller('users')
export class UsersController {
    constructor(
      @Inject('USER_SERVICE')  private readonly userService: IUserService,
    ){}
    
    @Get()
    getUsers(){
        return this.userService.getUser();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() user: UserDto){
        return this.userService.createUser(user);
    }

    @Delete()
    deleteUser(){
        this.userService.deleteUser();
    }

    @Get(':username')
    getUserByUsername(@Param('username') username: string){
       const user = this.userService.getUserByUsername(username);
       return user ? user : {};
    }
}

