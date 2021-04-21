/*
 *
 * NotesContainer reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';

export const initialState = {};

export const {
  Types: notesContainerTypes,
  Creators: notesContainerCreators
} = createActions({
  defaultAction: ['somePayload']
});

/* eslint-disable default-case, no-param-reassign */
export const notesContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case notesContainerTypes.DEFAULT_ACTION:
        draft.somePayload = action.somePayload;
        break;
      default:
        return state;
    }
  });

export default notesContainerReducer;
