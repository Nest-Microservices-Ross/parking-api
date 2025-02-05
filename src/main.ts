import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-custom-exception.filter';

async function bootstrap() {

  /** 
   * @method bootstrap
   * @description Bootstraps the application by creating an instance of the AppModule and setting up the global filters and pipes.
   * @returns {Promise<void>} A promise that resolves when the application is ready.
   */

  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );


  await app.listen(envs.port);
  logger.log(`Application is running on: ${envs.port}`);
}
bootstrap();
