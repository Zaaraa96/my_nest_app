import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter, ErroFilter, HttpExceptionFilter } from './utils/http_exception_handler';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
