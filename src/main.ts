import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyAuthMiddleware } from './auth/api-key-auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.use(new ApiKeyAuthMiddleware().use);
  await app.listen(3000);
}
bootstrap();
