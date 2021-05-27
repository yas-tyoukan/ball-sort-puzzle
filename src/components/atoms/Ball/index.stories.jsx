import React from 'react';
import Ball from '.';
import palette from './palette';

export default {
  title: 'atoms/Ball',
  component: Ball,
  decorators: [(Story) => <div style={{ display: 'flex', flexWrap: 'wrap' }}><Story /></div>],
};

const Template = (args) => (
  <>
    {palette.map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Ball {...args} key={i} color={i} />
    ))}
  </>
);

export const Default = Template.bind({});
