module.exports = {
  extends: 'airbnb',
  env: {
    node: true,
    es6: true,
  },
  overrides: [{
    files: ['server/*'],
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    },
  }],
};
