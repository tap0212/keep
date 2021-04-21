/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
export const initialState = {
  isSidebarActive: false
};

export const { Types: appTypes, Creators: appCreators } = createActions({
  setSidebar: ['bool']
});

/* eslint-disable default-case, no-param-reassign */
export const keeperReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case appTypes.SET_SIDEBAR:
        draft.isSidebarActive = action.bool;
        break;
      default:
        return state;
    }
  });

export default keeperReducer;
