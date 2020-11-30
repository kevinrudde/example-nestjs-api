import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesModule } from './resources/resources.module';
import { ConsoleModule } from 'nestjs-console';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
    }),
    ConsoleModule,
    ResourcesModule,
    TestModule,
  ],
})
export class AppModule {}
