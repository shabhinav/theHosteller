import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from "redux-persist/lib/storage/session";
import cartReducer from './cart/cart.reducer';
import searchReducer from './search/search.reducer';


const persistConfig = {
  key: "hosteller",
  storage: storageSession,
  whitelist: ["cart", "search"],
};

const appReducer = combineReducers({
  search: searchReducer,
  cart: cartReducer,
});

export default persistReducer(persistConfig, appReducer);
