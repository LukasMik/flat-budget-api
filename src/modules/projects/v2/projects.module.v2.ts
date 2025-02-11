import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service.v2';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsControllerV2 } from './projects.controller.v2';
import { Project, ProjectSchema } from '../schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectsControllerV2],
  providers: [ProjectsService],
})
export class ProjectsModuleV2 {}
