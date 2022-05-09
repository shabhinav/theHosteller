import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import { PURGE } from 'redux-persist/es/constants';
import thunk from 'redux-thunk';
import persistState from "redux-sessionstorage";
// import storageSession from "redux-persist/lib/storage/session";

import appReducer from './appReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Clear state from Local storage
export const clearReduxData = async () => {
  const persistor = persistStore(store);
  await persistor.purge();
};

const rootReducer = (state, action) => {
  if (action.type === PURGE) {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  composeEnhancers()
);

const persistor = persistStore(store);

export { store, persistor };
