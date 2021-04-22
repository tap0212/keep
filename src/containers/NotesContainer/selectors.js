import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

import { initialState as appContainerInitialState } from '../app/reducer';
/**
 * Direct selector to the notesContainer state domain
 */

const selectNotesContainerDomain = (state) =>
  state.notesContainer || initialState;
const selectAppDomain = (state) => state.App || appContainerInitialState;

const makeSelectNotesContainer = () =>
  createSelector(selectNotesContainerDomain, (substate) => substate);

export const selectNotes = () =>
  createSelector(selectAppDomain, (substate) => get(substate, 'notes', null));

export default makeSelectNotesContainer;
export { selectNotesContainerDomain };
