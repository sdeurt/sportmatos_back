import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './errors/AllExceptionsFilter';
const cors = require('cors');

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'upload')),
  app.use(cors());

  app.setGlobalPrefix('api'); // ajoute un préfixe "api" à toutes les routes (http://localhost:3000/api)
  app.useGlobalPipes(new ValidationPipe()); // permet la prise en charge globale des Dto (toutes les routes utilisent des Dto s'ils existent)
  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter()); // permet de gérer les erreurs de manières globales en utilisant un formalisme identique - créé dans le dossier "errors"
  const config = new DocumentBuilder() // configuration de l'API pour Swagger

    .setTitle('sportmatos')
    .setDescription('sportmatos API description')
    .setVersion('1.0')
    .addTag('sportmatos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
