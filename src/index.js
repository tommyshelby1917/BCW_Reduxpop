import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { setAuthorizationHeader } from './api/client';
import storage from './utils/storage';
import { createBrowserHistory } from 'history';

import configureStore from './store';
import Root from './components/Root';

import './index.css';

const accesToken = storage.get('auth');
setAuthorizationHeader(accesToken);

const history = createBrowserHistory();

const store = configureStore({ auth: !!accesToken }, { history });

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} history={history}>
      <App />
    </Root>
  </React.StrictMode>,
  document.getElementById('root')
);
