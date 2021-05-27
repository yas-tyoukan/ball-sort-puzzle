import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import composeComponents from '~/utils/composeComponents';
import { BoardContextProviderWrapper } from '~/contexts/BoardContext';
import boardContextDefaultValue  from '~/contexts/BoardContext/storyValue';

const ContextWrapper = composeComponents(
  (props) => <BoardContextProviderWrapper {...props} value={boardContextDefaultValue} />,
);

export const parameters = ({
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});

export const decorators = [(Story) => (
  <ContextWrapper>
    <Story/>
  </ContextWrapper>
)]
