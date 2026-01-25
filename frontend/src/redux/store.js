// src/app/store.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage

import cartReducer from './slice/CartSlice'
import AuthSliceReducer from "./slice/AuthSlice"
import UserInteractionReducer from "./slice/UserInteraction_Info"

const cartPersistConfig = {
  key: 'cart_PL',
  storage,
};

const userPersistConfig = {
  key: 'userDetail_PL',
  storage,
};
const userInteractConfig = {
  key: 'AI_interact_PL',
  storage,
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  auth: persistReducer(userPersistConfig, AuthSliceReducer),
  // interact: persistReducer(userInteractConfig, UserInteractionReducer),
});

const rootPersistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
