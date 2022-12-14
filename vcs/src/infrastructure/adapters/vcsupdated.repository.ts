import { PrismaService } from "@common/prisma/adapters/prisma.service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { tryCatch } from "fp-ts/lib/Option";
import { TaskEither } from "fp-ts/lib/TaskEither";
import { Project, VCSUpdated } from "@prisma/client";

export type ProjectName = string;


@Injectable()
export class ProjectRepository {
    constructor(private prisma: PrismaService) { }

    getByName = async (name: ProjectName): Promise<Project | null> =>  await this.prisma.project.findFirst({
          where: { name },
          //We retrieve the whole aggregate root (project + its contact informations)
          include: {
            VCSUpdated: true,
          },
        });

    save = async (project: Project) => await this.prisma.project.upsert({
          where: {
            id: project.id,
          },
          update: {
            name: project.name,
          },
          create: {
            name: project.name
          },
        });
}

@Injectable()
export class VCSUpdatedRepository {
    constructor(private prisma: PrismaService) { }
    getByProjectId = async (projectId: number) => await this.prisma.vCSUpdated.findMany({
      where: {projectId}
    });

    save = async (event: VCSUpdated) => await this.prisma.vCSUpdated.create({
        data: {
            initialCommit: event.initialCommit,
            projectId: event.projectId
        },
    });
}
