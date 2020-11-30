import { Command, Console } from 'nestjs-console';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProxyConfig } from '../entities/proxy-config.entity';

@Console()
export class InitialProxyConfigCommand {

  constructor(
    @InjectRepository(ProxyConfig) private repository: Repository<ProxyConfig>,
  ) {
  }

  @Command({
    command: 'init-proxy-config',
    description: 'Initialize proxy config',
  })
  async initializeProxyConfig(): Promise<void> {
    const config: ProxyConfig[] = [
      {
        key: 'slots',
        value: '256',
      },
      {
        key: 'maintenance',
        value: 'true',
      },
      {
        key: 'maintenanceMotd',
        value: 'A Minecraft Server (Maintenance)',
      },
      {
        key: 'motd',
        value: 'A Minecraft Server',
      },
    ];

    await this.repository.save(config);
  }
}
