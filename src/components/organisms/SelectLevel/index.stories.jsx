import React from 'react';
import { SelectLevelPresenter as SelectLevel } from '.';

export default {
  title: 'organisms/SelectLevel',
  component: SelectLevel,
  args: {
    value: 0,
    options: [{ label: 1, value: 1 }, { label: 2, value: 2 }],
  },
};

const Template = (args) => <SelectLevel {...args} />;

export const Default = Template.bind({});
