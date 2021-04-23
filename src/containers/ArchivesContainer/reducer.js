/*
 *
 * ArchivesContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {};

export const {
  Types: archivesContainerTypes,
  Creators: archivesContainerCreators
} = createActions({
  setOpenedNote: ['note']
});

/* eslint-disable default-case, no-param-reassign */
export const archivesContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case archivesContainerTypes.SET_OPENED_NOTE:
        draft.openedNote = action.note;
        break;
      default:
        return state;
    }
  });

export default archivesContainerReducer;
