import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

export abstract class ProcoreCommandBus {
  invoke!: (event: any) => Promise<void>;
}

@Injectable()
export class InMemoryCommandBus implements ProcoreCommandBus {
  constructor(private readonly commandBus: CommandBus){}
  invoke = async (command: any) => {
    return this.commandBus.execute(command);
  }
}