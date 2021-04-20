module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/App.js',
    '!src/index.js',
    '!src/components/ErrorBoundary/*.js',
    '!**/loadable.js',
    '!**/themes/index.js',
    '!src/configureStore.js',
    '!src/reducers.js',
    '!src/utils/history.js'
  ],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0
    }
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@src(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/build-utils/testing/test-bundler.js'],
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: []
};
