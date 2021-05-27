const path = require('path');
const webpackConfig = require('../webpack.config');

module.exports = {
  stories: [
    '../src/**/*.stories.jsx'
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links/register',
    '@storybook/addon-storysource/register',
    '@storybook/addon-essentials',
  ],
  webpackFinal: (config) => {
    // return config;
    const productConfig = webpackConfig(null, { mode: 'development' });
    config.resolve.alias = {...config.resolve.alias, ...productConfig.resolve.alias};
    Array.prototype.push.apply(config.plugins, productConfig.plugins);
    return config;
  },
};
