import { executeTask } from "@common/utils/executeTask";
import { Injectable } from "@nestjs/common";
import { EventsHandler } from "@nestjs/cqrs";
import { OnEvent } from "@nestjs/event-emitter";
import { SendVerificationCodeEmail } from "@notifications/application/commands/sendVerificationCodeEmail.command";
import { tryCatch } from "fp-ts/lib/Option";
import {LeadTimeRepository} from './leadTime.repository';
import {SERVICE_UPDATED} from '@vcs/domain/events/VCSUpdated.event';
import { ProcoreCommandBus } from "@common/messaging/adapters/commandBus.service";
import { VCSUpdated } from "@vcs/domain/events/VCSUpdated.event";
import {LeadTimeAdded} from '@prisma/client';

@EventsHandler(VCSUpdated)
export class VCSEventsSubscriber {
  constructor(private readonly repo: LeadTimeRepository){}
  // note - should be a void return type
  @OnEvent(SERVICE_UPDATED)
  async afterServiceUpdatedEvent(payload: VCSUpdated) {
    let leadTime = await this.repo.getByName(payload.projectName)
    if(!leadTime) {
      leadTime = await this.repo.update({
        name: payload.projectName,
        leadTime: payload.updateTimestamp - payload.firstCommitTimestamp
      })
    } else {
      const events: LeadTimeAdded[] = await this.repo.getEvents(leadTime.id);
      const newLeadTimeAverage = events.reduce(
        (acc, event) => acc + event.leadTime, (payload.updateTimestamp - payload.firstCommitTimestamp)
        ) / events.length;
      await this.repo.update({
        id: leadTime.id,
        name: payload.projectName,
        leadTime: newLeadTimeAverage
      });
    }
    this.repo.addEvent({ leadTimeId: leadTime.id, leadTime: payload.updateTimestamp - payload.firstCommitTimestamp})
  }
}
