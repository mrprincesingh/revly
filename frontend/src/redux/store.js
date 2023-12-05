import {
    applyMiddleware,
    legacy_createStore,
    combineReducers,
    compose,
  } from "redux";
  import {thunk} from 'redux-thunk';

  import { reducer as doubt } from "./doubt/reducer";
  import { reducer as auth } from "./auth/reducer";
  
  const rootRuducer = combineReducers({  auth , doubt});

  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  
  export const store = legacy_createStore(
    rootRuducer,
    composeEnhancers(applyMiddleware(thunk))
  );