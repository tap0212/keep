/*
 *
 * NotesContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {};

export const {
  Types: notesContainerTypes,
  Creators: notesContainerCreators
} = createActions({
  setOpenedNote: ['note']
});

/* eslint-disable default-case, no-param-reassign */
export const notesContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case notesContainerTypes.SET_OPENED_NOTE:
        draft.openedNote = action.note;
        break;
      default:
        return state;
    }
  });

export default notesContainerReducer;
