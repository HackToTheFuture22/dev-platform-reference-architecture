import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from '@octokit/rest';


@Injectable()
export class GitHubService {

  private octokit: Octokit;
  constructor(private readonly configService: ConfigService){
    this.octokit = new Octokit();
  }

  async createWebhook(): Promise<void> {
    const existingWebhooks = await this.octokit.orgs.getWebhook();
    if(!existingWebhooks) {
      this.octokit.orgs.createWebhook({
        org: 'HackToTheFuture22',
        name: 'updated',
        active: true,
        events: ['push'],
        config: {
          url: 'https://www.justab.it/github-webhook/serviceupdated',
          content_type: 'json',
        }
      })
    }
  }
}
