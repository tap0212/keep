/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
export const initialState = {
  isSidebarActive: false,
  menuOption: 0
};

export const { Types: appTypes, Creators: appCreators } = createActions({
  activateSidebar: [],
  deactivateSidebar: [],
  selectMenuOption: ['menuIndex']
});

/* eslint-disable default-case, no-param-reassign */
export const keeperReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case appTypes.ACTIVATE_SIDEBAR:
        draft.isSidebarActive = true;
        break;
      case appTypes.DEACTIVATE_SIDEBAR:
        draft.isSidebarActive = false;
        break;
      case appTypes.SELECT_MENU_OPTION:
        draft.selectedMenuOption = action.menuIndex;
        break;
      default:
        return state;
    }
  });

export default keeperReducer;
