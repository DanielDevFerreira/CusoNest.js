import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import passport from 'passport';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      cookie:{
        maxAge: 86400000,
      },
      secret: 'rastreei_fale_flex',
      resave: false,
      saveUninitialized: false,
    })
  );
  // app.use(passport.initialize());
  // app.use(passport.session());
  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
