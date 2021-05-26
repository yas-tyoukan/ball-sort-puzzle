module.exports = (api) => {
  const targets = {
    chrome: '74',
  };
  const presets = [
    [
      '@babel/preset-env',
      {
        targets,
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    [
      '@babel/preset-react',
      {
        development: !api.env('production'),
      },
    ],
  ];

  const plugins = [
    [
      'babel-plugin-styled-components',
      api.env('production')
        ? {
          fileName: false,
          displayName: false,
          pure: true,
        }
        : {
          fileName: true,
          displayName: true,
          minify: false,
        },
    ],
  ];

  if (api.env('test')) {
    plugins.push([
      require.resolve('babel-plugin-module-resolver'),
      {
        baseUrl: '.',
        alias: {
          '~': './src',
        },
      },
    ]);
  }

  return {
    presets,
    plugins,
  };
};
