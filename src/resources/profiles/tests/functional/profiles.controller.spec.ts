import { INestApplication } from '@nestjs/common';
import { executeFixture, get, post, put, setUpE2E } from '../../../../../test/test.util';
import { EntityManager } from 'typeorm';
import { Profile } from '../../entities/profile.entity';
import { Character } from '../../../characters/entities/character.entity';

describe('ProfilesController (e2e)', () => {
  let app: INestApplication = null;
  let entityManager: EntityManager;

  beforeAll(async () => {
    app = await setUpE2E();
    entityManager = app.get(EntityManager);
  });
  afterAll(async () => app.close());

  it('creates new profile on /profiles (POST)', async done => {
    const res = await post(app, '/profiles', {
      uuid: '8d695e42-2d04-4dd3-b6d8-3a538917fcda',
      name: 'Test',
      language: 'de_DE',
    });

    expect(res.status).toBe(201);

    const repository = entityManager.getRepository(Profile);
    const profile = await repository.findOne({ name: 'Test' });
    expect(profile).toHaveProperty('lastOnline');
    expect(profile).toHaveProperty('creationDate');

    delete profile.lastOnline;
    delete profile.creationDate;
    delete profile.group.id;

    expect(profile).toEqual({
      uuid: '8d695e42-2d04-4dd3-b6d8-3a538917fcda',
      name: 'Test',
      teamspeakUniqueId: null,
      language: 'de_DE',
      timePlayed: 0,
      banPoints: 0,
      permissions: null,
      group: {
        color: '#FFFFFF',
        name: 'player',
        permissions: [
          'test.player',
        ],
        power: 0,
        prefix: '',
      },
    });
    done();
  });

  it('gets profile on /profiles/:uuid (GET)', async done => {
    await executeFixture(app, 'src/resources/profiles/tests/fixtures/add-profile.sql');
    const res = await get(app, '/profiles/8d695e42-2d04-4dd3-b6d8-3a538917fcda');

    const data = res.body as Profile;

    delete data.group.id;

    expect(res.status).toBe(200);
    expect(data).toEqual({
      uuid: '8d695e42-2d04-4dd3-b6d8-3a538917fcda',
      name: 'Test',
      teamspeakUniqueId: 'uniqueId',
      language: 'de_DE',
      lastOnline: '2020-12-22T20:49:00.000Z',
      timePlayed: 0,
      banPoints: 0,
      permissions: null,
      creationDate: '2020-12-22T20:00:00.000Z',
      group: {
        color: '#FFFFFF',
        name: 'player',
        permissions: [
          'test.player',
        ],
        power: 0,
        prefix: '',
      },
    });

    done();
  });

  it('throws exception when creating a existing profile on /profiles (POST)', async done => {
    await executeFixture(app, 'src/resources/profiles/tests/fixtures/add-profile.sql');

    const res = await post(app, '/profiles', {
      uuid: '8d695e42-2d04-4dd3-b6d8-3a538917fcda',
      name: 'Test',
      language: 'de_DE',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual('Profile already exists');

    done();
  });

  it('updates a profile on /profiles/:uuid (PUT)', async done => {
    await executeFixture(app, 'src/resources/profiles/tests/fixtures/add-profile.sql');

    const res = await put(app, '/profiles/8d695e42-2d04-4dd3-b6d8-3a538917fcda', {
      name: 'Typsilonan',
      teamspeakUniqueId: 'teamspeakUnique',
      language: 'en_EN',
      lastOnline: '2020-12-23T20:49:00.000Z',
      timePlayed: 120,
      banPoints: 2,
      permissions: [
        'test.test',
        'test.glist',
      ],
    });

    expect(res.status).toBe(200);

    const repository = entityManager.getRepository(Profile);
    const profile = await repository.findOne({ uuid: '8d695e42-2d04-4dd3-b6d8-3a538917fcda' });
    expect(profile.lastOnline.toISOString()).toEqual('2020-12-23T20:49:00.000Z');

    delete profile.lastOnline;
    delete profile.creationDate;
    delete profile.group.id;

    expect(profile).toEqual({
      uuid: '8d695e42-2d04-4dd3-b6d8-3a538917fcda',
      name: 'Typsilonan',
      teamspeakUniqueId: 'teamspeakUnique',
      language: 'en_EN',
      timePlayed: 120,
      banPoints: 2,
      permissions: [
        'test.test',
        'test.glist',
      ],
      group: {
        color: '#FFFFFF',
        name: 'player',
        permissions: [
          'test.player',
        ],
        power: 0,
        prefix: '',
      },
    });

    done();
  });

  it('gets characters on /profiles/:uuid/characters (GET)', async done => {
    await executeFixture(app, 'src/resources/profiles/tests/fixtures/add-profile.sql');
    await executeFixture(app, 'src/resources/profiles/tests/fixtures/add-characters.sql');
    const res = await get(app, '/profiles/8d695e42-2d04-4dd3-b6d8-3a538917fcda/characters');

    expect(res.status).toBe(200);

    const data = res.body as Character[];

    expect(data).toStrictEqual([
      {
        id: '9c01b706-0214-4149-9e47-06d3e2c1134e',
        profileId: '8d695e42-2d04-4dd3-b6d8-3a538917fcda',
        level: 10,
        experience: '1500',
      },
    ]);

    done();
  });
});
