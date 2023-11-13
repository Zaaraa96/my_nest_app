import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter, ErroFilter, HttpExceptionFilter } from './utils/http_exception_handler';

const cookieSession = require('cookie-session'); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );
  app.use(cookieSession({keys:['asdfghj']}));
  const options = new DocumentBuilder()
  .setTitle('Your API Title')
  .setDescription('Your API description')
  .setVersion('1.0')
  .addServer('http://localhost:3000/', 'Local environment')
  // .addServer('https://staging.yourapi.com/', 'Staging')
  // .addServer('https://production.yourapi.com/', 'Production')
  .addTag('Your API Tag')
  .build();

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api-docs', app, document);

// const { httpAdapter } = app.get(HttpAdapterHost);
// app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

app.useGlobalFilters(new HttpExceptionFilter());
// app.useGlobalFilters(new ErroFilter());
  await app.listen(3000);
}
bootstrap();
