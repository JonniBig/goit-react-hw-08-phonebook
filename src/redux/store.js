import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactsReducer } from './contactSlice';
import { filterReducer } from './filterSlice';
import { authReducer } from './authSlice';

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const persistStoreAuthReducer = persistReducer(authConfig, authReducer);
const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
  auth: persistStoreAuthReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
