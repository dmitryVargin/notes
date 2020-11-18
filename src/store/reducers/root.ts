import appReducer from "./appReducer";
import { combineReducers } from "redux";
import leftSidebarReducer from "./leftSidebarReducer";

const root = combineReducers({
  app: appReducer,
  leftSidebar: leftSidebarReducer,
});
export default root;
