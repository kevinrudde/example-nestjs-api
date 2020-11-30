import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProxyConfig } from '../entities/proxy-config.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class ProxyConfigsRepository {

  constructor(
    @InjectRepository(ProxyConfig) private readonly repository: Repository<ProxyConfig>,
  ) {
  }

  getProxyConfig(): Observable<ProxyConfig[]> {
    return from(this.repository.find());
  }

  persist(proxyConfig: ProxyConfig): Observable<ProxyConfig> {
    return from(this.repository.save(proxyConfig));
  }
}
