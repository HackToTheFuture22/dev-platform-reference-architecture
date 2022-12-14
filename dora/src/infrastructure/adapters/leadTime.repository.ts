import { Injectable } from "@nestjs/common";
import { PrismaService } from "@common/prisma/adapters/prisma.service";
import { LeadTime } from "@prisma/client";

@Injectable()
export class LeadTimeRepository {
    constructor(private readonly prisma: PrismaService){}
    getByName = async(name: string) => await this.prisma.leadTime.findFirst({
        where: {name}
    });

    getEvents = async(leadTimeId: number) => await this.prisma.leadTimeAdded.find({
        where: {
            leadTimeId
        }
    })

    update = async (leadTime: LeadTime) => this.prisma.leadTime.upsert({
        where: {
            id: leadTime.id
        },
        update:  leadTime,
        create: leadTime
    }).then((leadTime) => {
        this.prisma.leadTimeAdded.create({
            data: {
                leadTime: leadTime.leadTime,
                leadTimeId: leadTime.id
            }
        })
    });
}