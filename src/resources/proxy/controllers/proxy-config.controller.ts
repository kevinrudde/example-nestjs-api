import { Body, Controller, Get, Put } from '@nestjs/common';
import { ProxyConfigService } from '../services/proxy-config.service';
import { Observable } from 'rxjs';
import { ProxyConfig } from '../entities/proxy-config.entity';

@Controller('proxy-config')
export class ProxyConfigController {

  constructor(
    private readonly proxyConfigService: ProxyConfigService,
  ) {
  }

  @Get()
  getProxyConfig(): Observable<ProxyConfig[]> {
    return this.proxyConfigService.getProxyConfig();
  }

  @Put()
  updateProxyConfig(@Body() proxyConfig: ProxyConfig): Observable<ProxyConfig> {
    return this.proxyConfigService.persist(proxyConfig);
  }
}
