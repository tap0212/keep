/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import createReducer from './reducers';

// redux persit configuration
const persistConfig = {
  version: 1,
  transforms: [immutableTransform()],
  key: 'root',
  blacklist: ['router'],
  storage
};

const persistedReducer = persistReducer(persistConfig, createReducer());

export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;

  // If Redux Dev Tools enable it
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
    }
  }

  const enhancers = [applyMiddleware(...[])];

  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(...enhancers)
  );

  const persistor = persistStore(store);

  // Extensions
  store.injectedReducers = {}; // Reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return { store, persistor };
}
