module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base'],
  plugins: ['import'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 0,
    'dot-notation': 0,
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'arrow-parens': [2, 'as-needed'],
    'func-names': 0,
  },
};
