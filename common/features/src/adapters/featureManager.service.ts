import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
export abstract class FeatureManager {
  execute!: <TNew, TPrev>(name: string, whenEnabled: () => Promise<TNew>, whenDisabled: () => Promise<TPrev>) 
    => Promise<TNew|TPrev>;
}

@Injectable()
export class FeatureService implements OnModuleInit, FeatureManager {
  async execute<TNew, TPrev>(name: string, whenEnabled: () => Promise<TNew>, whenDisabled: () => Promise<TPrev>): Promise<TNew | TPrev> {
    // TODO - replace with actual feature management
    return await whenEnabled()
  }

  async onModuleInit() {
    // do feature cache initialization
  }

}
