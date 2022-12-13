import { executeTask } from "@common/utils/executeTask";
import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { OnEvent } from "@nestjs/event-emitter";
import { SendVerificationCodeEmail } from "@notifications/application/commands/sendVerificationCodeEmail.command";
import { tryCatch } from "fp-ts/lib/Option";

const SERVICE_UPDATED = "vcs.service.updated";
type ServiceUpdatedEvent = {}

@Injectable()
export class VCSEventsSubscriber {
  constructor(private readonly commandBus: CommandBus) {}

  // note - should be a void return type
  @OnEvent(SERVICE_UPDATED)
  async afterUserRegisteredEvent(payload: ServiceUpdatedEvent) {
  }
}
