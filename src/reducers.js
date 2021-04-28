/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import App from './containers/app/reducer';
import archivesContainer from './containers/ArchivesContainer/reducer';
import notesContainer from './containers/NotesContainer/reducer';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer() {
  const rootReducer = combineReducers({
    App,
    archivesContainer,
    notesContainer
  });

  return rootReducer;
}
