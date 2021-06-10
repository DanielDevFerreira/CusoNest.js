import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { PostController } from './controllers/post/post.controller';
import { UserService } from './service/user/user.service';
import { PostService } from './service/post/post.service';

@Module({
  controllers: [
    UsersController,
    PostController
  ],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UserService,
    },
    PostService
  ],
})
export class UsersModule {}
