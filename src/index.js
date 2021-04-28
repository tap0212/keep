import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from './utils/history';
import App from './containers/app/';
import ErrorBoundary from './components/ErrorBoundary';
import 'regenerator-runtime/runtime.js';
import configureStore from './configureStore';
import { persistData } from './utils';

// Create redux store with history
const initialState = {};
const { store } = configureStore(initialState, history);
store.subscribe(() => {
  persistData({
    isSidebarActive: store.getState().App.isSidebarActive,
    notes: store.getState().App.notes,
    searchResults: store.getState().App.searchResults,
    isDarkModeActive: store.getState().App.isDarkModeActive
  });
});
ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ErrorBoundary>,

  document.getElementById('app')
);

module.hot.accept();
