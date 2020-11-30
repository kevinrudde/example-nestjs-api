import { INestApplication } from '@nestjs/common';
import { executeFixture, get, setUpE2E } from '../../../../../test/test.util';

describe('AuthController (e2e)', () => {
  let app: INestApplication = null;

  beforeAll(async () => {
    app = await setUpE2E();
  });
  afterAll(async () => app.close());

  it('get all users on /users (GET)', async done => {
    await executeFixture(app, 'src/resources/users/tests/fixtures/add-users.sql');

    const res = await get(app, '/users');

    expect(res.status).toBe(200);

    const user = res.body[0];
    delete user.id;

    expect(user).toStrictEqual({
      username: 'username',
      password: 'password',
    });

    done();
  });
});
