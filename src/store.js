import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunkMiddleware from "redux-thunk";

// Outer function:
const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", result);
  return result;
};
const composedEnhancer = composeWithDevTools(
  // EXAMPLE: Add whatever middleware you actually want to use here
  applyMiddleware(thunkMiddleware, loggerMiddleware)
  // other store enhancers if any
);

const store = createStore(rootReducer, composedEnhancer);

export default store;
