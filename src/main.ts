import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { RoomsModule } from './modules/rooms/rooms.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { ProjectsModuleV1 } from './modules/projects/v1/projects.module.v1';
import { ProjectsModuleV2 } from './modules/projects/v2/projects.module.v2';
import { UsedMaterialsModule } from './modules/used-materials/used-materials.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException(
          errors.map((error) => ({
            field: error.property,
            message: Object.values(error.constraints).join(', '),
          })),
        );
      },
    }),
  );

  // ✅ Swagger V1
  const configV1 = new DocumentBuilder()
    .setTitle('Flat Budget API - V1')
    .setDescription('API documentation for version 1')
    .setVersion('1.0')
    .build();
  const documentV1 = SwaggerModule.createDocument(app, configV1, {
    include: [
      ProjectsModuleV1,
      RoomsModule,
      MaterialsModule,
      UsedMaterialsModule,
    ],
  });
  SwaggerModule.setup('api/v1/docs', app, documentV1);

  // ✅ Swagger V2
  const configV2 = new DocumentBuilder()
    .setTitle('Flat Budget API - V2')
    .setDescription('API documentation for version 2')
    .setVersion('2.0')
    .build();
  const documentV2 = SwaggerModule.createDocument(app, configV2, {
    include: [ProjectsModuleV2],
  });
  SwaggerModule.setup('api/v2/docs', app, documentV2);

  await app.listen(process.env.PORT ?? 3000).then(() => {
    console.log(`🚀 Application running at port ${process.env.PORT ?? 3000}`);
  });
}
bootstrap();
