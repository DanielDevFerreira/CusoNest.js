import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { UserService } from './users/service/user/user.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '104.198.68.131',
      port: 3306,
      username: 'fcouto',
      password: 'fcouto123',
      database: 'tts',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
