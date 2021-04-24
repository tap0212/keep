import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import history from './utils/history';
import App from './containers/app/';
import ErrorBoundary from './components/ErrorBoundary';
import 'regenerator-runtime/runtime.js';
import configureStore from './configureStore';

// Create redux store with history
const initialState = {};
const { store, persistor } = configureStore(initialState, history);
ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </ErrorBoundary>,

  document.getElementById('app')
);

module.hot.accept();
