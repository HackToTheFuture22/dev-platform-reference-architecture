import { Global, INestApplication, Injectable, Module, OnModuleInit } from '@nestjs/common';
import {EventBus} from "@nestjs/cqrs";
import { InMemoryEventBus, ProcoreEventBus } from './adapters/eventBus.service';


const providers = [
  {
    useClass: InMemoryEventBus,
    provide: ProcoreEventBus
  }
]

@Global()
@Module({
  providers: providers,
  exports: providers,
})
export class MessagingModule {}
