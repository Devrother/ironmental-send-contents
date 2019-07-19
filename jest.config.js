module.exports = {
  setupFiles: ['dotenv/config'],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'node',
  reporters: [ "default", "jest-junit" ],
};
