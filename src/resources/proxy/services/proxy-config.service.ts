import { Injectable } from '@nestjs/common';
import { ProxyConfigsRepository } from '../repositories/proxy-configs.repository';
import { Observable } from 'rxjs';
import { ProxyConfig } from '../entities/proxy-config.entity';

@Injectable()
export class ProxyConfigService {

  constructor(
    private readonly proxyConfigRepository: ProxyConfigsRepository,
  ) {
  }

  getProxyConfig(): Observable<ProxyConfig[]> {
    return this.proxyConfigRepository.getProxyConfig();
  }

  persist(proxyConfig: ProxyConfig): Observable<ProxyConfig> {
    return this.proxyConfigRepository.persist(proxyConfig);
  }
}
