const dotenv = require('dotenv');

dotenv.config({ path: '.env.development' });

jestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', '<rootDir>'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  }
};

module.exports = jestConfig