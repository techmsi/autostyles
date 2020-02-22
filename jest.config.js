module.exports = {
  verbose: true,
  testTimeout: 50000,
  testEnvironment: 'node',
  modulePaths: ['src', '/node_modules/'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'coverage/junit'
      }
    ]
  ],
  collectCoverageFrom: ['src/**/{!(autostyles),}.js']
};
