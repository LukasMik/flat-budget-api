import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service.v1';
import { ProjectsControllerV1 } from './projects.controller.v1';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '../schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectsControllerV1],
  providers: [ProjectsService],
})
export class ProjectsModuleV1 {}
