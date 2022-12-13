import { Global, INestApplication, Injectable, Module, OnModuleInit } from '@nestjs/common';
import { FeatureManager, FeatureService } from './adapters/featureManager.service';

const provider = {
  provide: FeatureManager,
  useClass: FeatureService,
};
@Global()
@Module({
  providers: [provider],
  exports: [provider],
})
export class FeatureModule {}
