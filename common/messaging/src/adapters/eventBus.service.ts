import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";

export abstract class ProcoreEventBus {
  publish!: (event: any) => Promise<void>;
}

@Injectable()
export class InMemoryEventBus implements ProcoreEventBus {
  constructor(private readonly eventBus: EventBus){}
  publish = async (event: any) => {
    return this.eventBus.publish(event);
  }
}