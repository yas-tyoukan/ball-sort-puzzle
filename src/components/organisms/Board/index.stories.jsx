import React from 'react';
import questions from '~/questions';
import { BoardPresenter as Board } from '.';

export default {
  title: 'organisms/Board',
  component: Board,
  args: {
    tubes: questions[0],
  },
};

const Template = (args) => <Board {...args} />;

export const Default = Template.bind({});
export const Completed = Template.bind({});
Completed.args = { isCompleted: true };
