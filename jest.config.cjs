// Jest configuration for unit + component tests (React Testing Library).
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
  moduleNameMapper: {
    // Stub out CSS imports so component modules can be imported in tests.
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testMatch: ['<rootDir>/src/tests/**/*.test.{js,jsx}'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/**/index.js',
    '!src/tests/**',
  ],
  coverageThreshold: {
    global: { branches: 60, functions: 65, lines: 70, statements: 70 },
  },
  clearMocks: true,
};
