import 'core-js';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import composeComponents from '~/utils/composeComponents';
import GlobalStyle from '~/styles/globalStyle';
import { BoardContextProviderWrapper } from '~/contexts/BoardContext';
import AppPage from '~/components/pages/AppPage';

const rootEl = document.getElementById('root');

const ContextWrapper = composeComponents(
  BoardContextProviderWrapper,
);

ReactDOM.render(
  <>
    <GlobalStyle />
    <ContextWrapper>
      <AppPage />
    </ContextWrapper>
  </>,
  rootEl,
);
