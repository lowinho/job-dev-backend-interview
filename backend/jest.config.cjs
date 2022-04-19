module.exports = {
    preset: 'ts-jest',
    verbose: true,
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    testMatch: [
      "**/__tests__/**/!(DISABLED.)*.[jt]s?(x)",
      "**/!(DISABLED.)?(*.)+(spec|test).[tj]s?(x)",
    ],
    testPathIgnorePatterns: [
      "/node_modules/",
      "<rootDir>/ignore/this/path/" 
    ],
  };