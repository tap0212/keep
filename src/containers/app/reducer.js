/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
export const initialState = {
  isSidebarActive: false,
  notes: []
};

export const { Types: appTypes, Creators: appCreators } = createActions({
  setSidebar: ['bool'],
  addNote: ['note'],
  deleteNote: ['notes']
});

/* eslint-disable default-case, no-param-reassign */
export const keeperReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case appTypes.SET_SIDEBAR:
        draft.isSidebarActive = action.bool;
        break;
      case appTypes.ADD_NOTE:
        draft.notes.push(action.note);
        break;
      case appTypes.DELETE_NOTE:
        draft.notes = action.notes;
        break;
      default:
        return state;
    }
  });

export default keeperReducer;
