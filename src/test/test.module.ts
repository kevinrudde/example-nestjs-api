import { Module } from '@nestjs/common';
import { TestDatabaseCommand } from './commands/test-database.command';

@Module({
  providers: [
    TestDatabaseCommand,
  ]
})
export class TestModule {}
