import React from 'react';
import App from '.';

export default {
  title: 'pages/App',
  component: App,
  args: {
    balls: [],
  },
};

const Template = (args) => <App {...args} />;

export const Default = Template.bind({});
