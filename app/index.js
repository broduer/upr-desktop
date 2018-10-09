import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as Sentry from '@sentry/electron';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

Sentry.init({
  dsn: 'https://cf07bcc0594241ce8c7db854e0f3f65a@sentry.io/1297683'
});

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
