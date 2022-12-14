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
    const leadTime = await this.repo.getByName(payload.projectName)
    const events: [] = await this.repo.getEvents(leadTime.id);
  }
}
