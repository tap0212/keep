import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notesContainer state domain
 */

const selectNotesContainerDomain = (state) =>
  state.notesContainer || initialState;

const makeSelectNotesContainer = () =>
  createSelector(selectNotesContainerDomain, (substate) => substate);

export default makeSelectNotesContainer;
export { selectNotesContainerDomain };
