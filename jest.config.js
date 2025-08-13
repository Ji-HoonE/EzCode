/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // 브라우저 환경 시뮬레이션 (React 테스트에 필요)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // 이전에 만든 setup 파일
  moduleNameMapper: {
    // 경로 별칭을 매핑 (필요 시)
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|png|jpg|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
