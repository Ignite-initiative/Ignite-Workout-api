const dotenv = require('dotenv');

dotenv.config({ path: '.env.development' });

jestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', '<rootDir>'],
  transform: {
    '^.+\\.ts?$': '@swc/jest'
  }
};

module.exports = jestConfig