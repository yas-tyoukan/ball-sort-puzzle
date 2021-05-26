module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
    react: {
      pragma: 'React',
      version: '17.0.1',
    },
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '.storybook/',
          '**/*.stories.jsx',
          '**/*.test.js',
          '**/storyutils/*',
        ],
      },
    ],
    'react/jsx-props-no-spreading': ['error', {
      html: 'enforce',
      custom: 'ignore',
      exceptions: [],
    }],
    // プライベートメソッドの表現で'_'使いたいため
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
  },
};
