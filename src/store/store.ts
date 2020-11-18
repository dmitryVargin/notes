import {createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import root from "./reducers/root";



import {createLogger} from "redux-logger"


const logger = createLogger({
  duration: true,
  collapsed: true,
  colors: {
    title: () => '#123BFE',
    prevState: () => '#001277',
    action: () => '#2fb033',
    nextState: () => '#fe8c12',
    error: () => '#e20808',
  }
})


const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(root, composeEnhancers(applyMiddleware(...[logger, thunk])));
export default store;
