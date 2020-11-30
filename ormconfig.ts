const prodConfig = {
  'type': 'cockroachdb',
  'host': process.env.COCKROACH_HOST,
  'port': process.env.COCKROACH_PORT,
  'username': process.env.COCKROACH_USER,
  'password': process.env.COCKROACH_PASSWORD,
  'database': process.env.COCKROACH_DATABASE,
  'entities': [
    'dist/**/*.entity.js'
  ],
  'migrations': [
    'dist/migrations/*.js'
  ],
  'cli': {
    'migrationsDir': 'migrations'
  },
  'migrationsRun': true,
};

if (process.env.COCKROACH_SSL_ENABLED === 'true') {
  prodConfig['ssl'] = true;
  prodConfig['extra'] = {
    'ssl': {
      'rejectUnauthorized': false,
    },
  };
}

const testConfig = {
  'type': 'cockroachdb',
  'host': process.env.COCKROACH_HOST,
  'port': process.env.COCKROACH_PORT,
  'username': process.env.COCKROACH_USER,
  'password': process.env.COCKROACH_PASSWORD,
  'database': 'nest_test',
  'entities': [
    'src/**/*.entity.ts'
  ],
  'migrations': [
    'migrations/*.ts'
  ],
  'cli': {
    'migrationsDir': 'migrations'
  }
};

const consoleConfig = {
  ...prodConfig,
  'entities': [
    'src/**/*.entity.ts'
  ],
  'migrations': [
    'migrations/*.ts'
  ],
};

if (process.env.NODE_ENV === 'console') {
  module.exports = consoleConfig;
} else if (process.env.NODE_ENV === 'test') {
  module.exports = testConfig;
} else {
  module.exports = prodConfig;
}
