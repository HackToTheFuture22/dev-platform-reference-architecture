import { Module, Global } from '@nestjs/common';
import { VCSEventsSubscriber } from './infrastructure/adapters/VCSEvents.subscriber';
import {MessagingModule} from '@common/messaging/messaging.module';

@Global()
@Module({
    imports: [MessagingModule],
    providers: [VCSEventsSubscriber],
    exports: [VCSEventsSubscriber],
})
export class DoraModule {}
