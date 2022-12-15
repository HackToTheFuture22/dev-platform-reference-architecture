import { ConfigService } from "@nestjs/config";
import { Octokit } from "@octokit/rest";

export class GitHubService {

  private octokit: Octokit;
  constructor(private readonly configService: ConfigService){
    this.octokit = new Octokit({
      auth: this.configService.get('GITHUB_TOKEN'),
    });
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
