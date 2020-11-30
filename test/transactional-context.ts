import { TransactionalTestContext } from 'typeorm-transactional-tests';
import { getConnection } from 'typeorm';

let transactionalContext: TransactionalTestContext;
let connection;

global.beforeEach(async () => {
  connection = getConnection();
  transactionalContext = new TransactionalTestContext(connection);
  await transactionalContext.start();
});

global.afterEach(async () => {
  await transactionalContext.finish();
});
