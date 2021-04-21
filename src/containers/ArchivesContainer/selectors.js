import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the archivesContainer state domain
 */

const selectArchivesContainerDomain = (state) =>
  state.archivesContainer || initialState;

const makeSelectArchivesContainer = () =>
  createSelector(selectArchivesContainerDomain, (substate) => substate);

export default makeSelectArchivesContainer;
export { selectArchivesContainerDomain };
