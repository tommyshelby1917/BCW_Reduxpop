import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import * as auth from '../components/auth/service';
import * as adverts from '../components/adverts/service';

import * as reducers from './reducers';

// the two services that we've imported
const api = { auth, adverts };

const configureStore = (preloadedState, { history }) => {
  const middlewares = [
    routerMiddleware(history),
    // to actions.js we send the object with the api && history
    thunk.withExtraArgument({ api, history }),
  ];

  const store = createStore(
    // as the functions are called the same as the properties in the defaultstore (reducers.js)
    // it is enough to pass the object to it (called Reducers)
    combineReducers({ ...reducers, router: connectRouter(history) }),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
};

export default configureStore;
