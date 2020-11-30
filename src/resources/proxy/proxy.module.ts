import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProxyConfig } from './entities/proxy-config.entity';
import { ProxyConfigController } from './controllers/proxy-config.controller';
import { ProxyConfigsRepository } from './repositories/proxy-configs.repository';
import { ProxyConfigService } from './services/proxy-config.service';
import { InitialProxyConfigCommand } from './commands/initial-proxy-config.command';

const PROVIDERS = [
  ProxyConfigsRepository,
  ProxyConfigService,
  InitialProxyConfigCommand,
];

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([ProxyConfig]),
  ],
  controllers: [
    ProxyConfigController,
  ],
  providers: PROVIDERS,
  exports: PROVIDERS,
})
export class ProxyModule {}
