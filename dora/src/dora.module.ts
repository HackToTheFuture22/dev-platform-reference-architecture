import { Module, Global } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VCSEventsSubscriber } from './infrastructure/adapters/VCSEvents.subscriber';

@Global()
@Module({
    imports: [CqrsModule],
    providers: [VCSEventsSubscriber],
    exports: [VCSEventsSubscriber],
})
export class DoraModule {}
