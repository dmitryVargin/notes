import {TOGGLE_LEFT_SIDEBAR} from "../actionTypes/constants";

export const toggleLeftSidebar = () =>
  ({
    type: TOGGLE_LEFT_SIDEBAR,
  } as const);

