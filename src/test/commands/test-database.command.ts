import { Command, Console } from 'nestjs-console';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';

@Console()
export class TestDatabaseCommand {

  constructor(
    @InjectConnection() private connection: Connection,
  ) {
  }

  @Command({
    command: 'init-test-db',
    description: 'Initializes test database'
  })
  async initializeTestDatabase(): Promise<void> {
    try {
      await this.connection.query('CREATE DATABASE nest_test;');
    } catch (e) {
      Logger.warn(e.message);
      return;
    }
    Logger.log('Successfully created test database!');
  }

  @Command({
    command: 'drop-test-db',
    description: 'Initializes test database'
  })
  async dropTestDatabase(): Promise<void> {
    try {
      await this.connection.query('DROP DATABASE nest_test;');
    } catch (e) {
      Logger.warn(e.message);
      return;
    }
    Logger.log('Successfully dropped test database!');
  }
}
