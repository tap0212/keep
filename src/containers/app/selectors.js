import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the App state domain
 */

const selectAppContainerDomain = (state) => state.App || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AppContainer
 */

export const selectHomeContainer = () =>
  createSelector(selectAppContainerDomain, (substate) => substate);

export const selectIsSidebarActive = () =>
  createSelector(selectAppContainerDomain, (substate) =>
    get(substate, 'isSidebarActive', false)
  );

export default selectHomeContainer;
