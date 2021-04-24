import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';
import { initialState as appContainerInitialState } from '../app/reducer';

/**
 * Direct selector to the archivesContainer state domain
 */

const selectArchivesContainerDomain = (state) =>
  state.archivesContainer || initialState;
const selectAppDomain = (state) => state.App || appContainerInitialState;

const makeSelectArchivesContainer = () =>
  createSelector(selectArchivesContainerDomain, (substate) => substate);

export const selectNotes = () =>
  createSelector(selectAppDomain, (substate) => get(substate, 'notes', null));

export const selectSelectedNote = () =>
  createSelector(selectArchivesContainerDomain, (substate) =>
    get(substate, 'openedNote', null)
  );
export const selectSearchedNotes = () =>
  createSelector(selectAppDomain, (substate) =>
    get(substate, 'searchResults', {})
  );
export default makeSelectArchivesContainer;
export { selectArchivesContainerDomain };
