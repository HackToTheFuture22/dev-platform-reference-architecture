import { Injectable } from '@nestjs/common';
import Okto

export interface WebhookRegistration {}

@Injectable()
export class GitHubService {
  private octokit = new Octokit({
    auth: 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN',
  });

  async processWebhook(): Promise<Payload|null> {
  }
}