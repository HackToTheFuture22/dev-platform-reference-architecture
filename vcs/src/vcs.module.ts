import { Module } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { GithubWebhookController } from './infrastructure/adapters/controllers/github-webhook.controller';
import { GitHubModule } from '@common/github/github.module';
import { GitHubService } from '@common/github/adapters/github.service';
import { MessagingModule } from '@common/messaging/messaging.module';


@Module({
    controllers: [GithubWebhookController],
    imports: [GitHubModule, MessagingModule]
})
export class VcsModule implements OnModuleInit {
    constructor(private readonly gh: GitHubService) {}
    async onModuleInit() {
        this.gh.registerWebhook({});
    }
}
