import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GitHubService } from '../src/adapters/github.service';
import { LoggerModule } from '@common/logger/logger.module';
import axios from 'axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  exports: [GitHubService],
  providers: [GitHubService, LoggerModule],
})
export class GitHubModule {}