import { Module } from '@nestjs/common';
import { GithubWebhookController } from './infrastructure/adapters/controllers/github-webhook.controller';

@Module({
    controllers: [GithubWebhookController]
})
export class VcsModule {}
