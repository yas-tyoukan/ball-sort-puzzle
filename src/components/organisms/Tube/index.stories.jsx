import React from 'react';
import Tube from '.';

export default {
  title: 'organisms/Tube',
  component: Tube,
  args: {
    balls: [],
  },
};

const Template = (args) => <Tube {...args} />;

export const Default = Template.bind({});

export const WithBalls = Template.bind({});
WithBalls.args = { balls: [1, 2, 3, 4] };

export const Selected = Template.bind({});
Selected.args = { balls: [1, 2, 3, 4], isSelected: true };
