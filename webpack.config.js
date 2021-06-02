const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = (env, args) => {
  const isProduction = args && args.mode === 'production';
  const rules = [{
    test: /\.jsx?$/,
    exclude: /node_modules\/core-js/,
    use: 'babel-loader',
  }, {
    // graphql-jsの読み込みに必要
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
  }];

  const plugins = [];

  if (!isProduction) {
    rules.push({
      enforce: 'pre',
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'eslint-loader',
        options: {
          configFile: path.join(__dirname, 'src/.eslintrc.js'),
        },
      }],
    });
    plugins.push(
      new StylelintPlugin({
        files: './src/**/*.jsx',
      }),
    );
  }

  return {
    entry: './src/entries/index.jsx',
    output: {
      path: path.join(__dirname, 'public/js'),
      filename: 'bundle.js',
      publicPath: '/public/js/',
    },
    module: { rules },
    resolve: {
      modules: ['node_modules'],
      alias: {
        '~': path.join(__dirname, 'src'),
      },
      extensions: ['.js', '.jsx'],
    },
    plugins,
    performance: {
      maxEntrypointSize: 2000000, // 2MB
      maxAssetSize: 2000000, // 2MB
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      watchContentBase: true,
      publicPath: '/js/',
      historyApiFallback: true,
      disableHostCheck: true,
    },
  };
};
