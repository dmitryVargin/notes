import {
  TOGGLE_LEFT_SIDEBAR,
} from "../actions/actionTypes/constants";

import ILeftSidebarState from "../../interfaces/leftSidebarState";
import {leftSidebarActionTypes} from "../actions/actionTypes/ActionTypes";

const initialState: ILeftSidebarState = {
  isVisibleLeftSidebar: true,
  searchQuery: "",
};

export default function leftSidebarReducer(
  state = initialState,
  action: leftSidebarActionTypes
) {
  switch (action.type) {
    case TOGGLE_LEFT_SIDEBAR:
      return {
        ...state,
        isVisibleLeftSidebar: !state.isVisibleLeftSidebar,
      };
    default:
      return state;
  }
}
