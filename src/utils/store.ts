import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import authSlice from '../reducers/authSlice';

// Reducer(s) - Replace with your actual reducers

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  // Add more reducers here
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof store.getState>; // This defines the RootState type

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
