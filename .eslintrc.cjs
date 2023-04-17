// how to fix this error
// Error: .eslintrc.cjs » eslint-config-react-app » /Users/username/Projects/project/node_modules/eslint-config-react-app/index.js:
module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
      '@typescript-eslint/no-inferrable-types': 'warning',
    },
  }
  