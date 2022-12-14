import { Injectable } from "@nestjs/common";
import { PrismaService } from "@common/prisma/adapters/prisma.service";
import { LeadTime, LeadTimeAdded } from "@prisma/client";

@Injectable()
export class LeadTimeRepository {
    constructor(private readonly prisma: PrismaService){}
    addEvent = async (event: Omit<LeadTimeAdded, 'id'>) => await this.prisma.leadTimeAdded.create({
        data: event
    });  

    getByName = async(name: string) => await this.prisma.leadTime.findFirst({
        where: {name}
    });

    getEvents = async(leadTimeId: number) => await this.prisma.leadTimeAdded.findMany({
        where: {
            leadTimeId
        }
    })

    update = async (leadTime: LeadTime | {id?: number, leadTime: number, name: string}) => this.prisma.leadTime.upsert({
        where: {
            id: leadTime.id
        },
        update:  leadTime,
        create: leadTime
    });
}
