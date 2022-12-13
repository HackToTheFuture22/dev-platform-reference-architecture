import { Test, TestingModule } from '@nestjs/testing';
import { GithubWebhookController } from './github-webhook.controller';

describe('GithubWebhookController', () => {
  let controller: GithubWebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubWebhookController],
    }).compile();

    controller = module.get<GithubWebhookController>(GithubWebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
