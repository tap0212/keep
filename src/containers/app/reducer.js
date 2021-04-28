/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import { getPersistedData } from '../../utils';

export const initialState = {
  isSidebarActive: getPersistedData().isSidebarActive,
  notes: getPersistedData().notes,
  searchResults: getPersistedData().searchResults,
  isDarkModeActive: getPersistedData().isDarkModeActive
};

export const { Types: appTypes, Creators: appCreators } = createActions({
  setSidebar: ['bool'],
  addNote: ['note'],
  deleteNote: ['noteId'],
  archiveNote: ['noteId'],
  unArchiveNote: ['noteId'],
  updateNote: ['data'],
  searchResult: ['data'],
  toggleSidebar: [],
  deleteSearchedNote: ['noteId'],
  updateSearchedNote: ['data'],
  toggleDarkMode: []
});

/* eslint-disable default-case, no-param-reassign */
export const keeperReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case appTypes.SET_SIDEBAR:
        draft.isSidebarActive = action.bool;
        break;
      case appTypes.ADD_NOTE:
        draft.notes = {
          ...state.notes,
          [action.note.id]: action.note
        };
        break;
      case appTypes.DELETE_NOTE:
        draft.notes = (function (state) {
          const newstate = { ...state.notes };
          delete newstate[action.noteId];
          return newstate;
        })(state);
        break;
      case appTypes.ARCHIVE_NOTE:
        draft.notes[action.noteId].isArchived = true;
        break;
      case appTypes.UN_ARCHIVE_NOTE:
        draft.notes[action.noteId].isArchived = false;
        break;
      case appTypes.UPDATE_NOTE:
        draft.notes[action.data.id][action.data.key] = action.data.value;
        break;
      case appTypes.SEARCH_RESULT:
        draft.searchResults = action.data;
        break;
      case appTypes.TOGGLE_SIDEBAR:
        draft.isSidebarActive = !state.isSidebarActive;
        break;
      case appTypes.DELETE_SEARCHED_NOTE:
        draft.notes = (function (state) {
          const newstate = { ...state.notes };
          delete newstate[action.noteId];
          return newstate;
        })(state);
        draft.searchResults = { searchResp: [], searchQuery: '' };
        break;
      case appTypes.UPDATE_SEARCHED_NOTE:
        draft.notes[action.data.id][action.data.key] = action.data.value;
        draft.searchResults = { searchResp: [], searchQuery: '' };
        break;
      case appTypes.TOGGLE_DARK_MODE:
        draft.isDarkModeActive = !state.isDarkModeActive;
        break;
      default:
        return state;
    }
  });

export default keeperReducer;
