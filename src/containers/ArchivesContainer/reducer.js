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
  defaultAction: ['somePayload']
});

/* eslint-disable default-case, no-param-reassign */
export const archivesContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case archivesContainerTypes.DEFAULT_ACTION:
        draft.somePayload = action.somePayload;
        break;
      default:
        return state;
    }
  });

export default archivesContainerReducer;
