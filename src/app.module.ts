import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModuleV1 } from './modules/projects/v1/projects.module.v1';
import { RoomsModule } from './modules/rooms/rooms.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { ProjectsModuleV2 } from './modules/projects/v2/projects.module.v2';
import { UsedMaterialsModule } from './modules/used-materials/used-materials.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:adminHeslo420@flat-budget-mongodb-container:27017/flat-budget?authSource=admin',
      {
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('MongoDB connected successfully');
          });
          connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
          });
          return connection;
        },
        retryAttempts: 5,
        retryDelay: 3000,
      },
    ),
    ProjectsModuleV1,
    ProjectsModuleV2,
    RoomsModule,
    MaterialsModule,
    UsedMaterialsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
