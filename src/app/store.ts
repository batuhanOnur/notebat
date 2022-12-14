import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authSlice } from '../features/api/authSlice'
import { workspaceSlice } from '../features/api/workspaceSlice'
import { boardSlice } from '../features/api/boardSlice'
import userSlice from '../features/user/userSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}


const persistedReducer = persistReducer(persistConfig, userSlice)

export const store = configureStore({
    reducer: {
      [authSlice.reducerPath]: authSlice.reducer,
      [workspaceSlice.reducerPath] : workspaceSlice.reducer,
      [boardSlice.reducerPath] : boardSlice.reducer,
      persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authSlice.middleware,
      workspaceSlice.middleware,
      boardSlice.middleware,
    ),
  })
  setupListeners(store.dispatch)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch