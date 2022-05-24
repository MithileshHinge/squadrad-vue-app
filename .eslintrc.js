const accessibilityOff = Object.keys(require('eslint-plugin-vuejs-accessibility').rules).reduce((acc, rule) => { acc[`vuejs-accessibility/${rule}`] = 'off'; return acc; }, {});

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': [2, 'tab'],
    'no-tabs': 0,
    'max-len': 0,
    ...accessibilityOff,
  },
};
