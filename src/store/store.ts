import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import  {cardsReducer}  from './slices/cardsSlice';
import { cardsApi } from './services/cardsApi';
import { userApi } from './services/userApi';
import  {userReducer}  from './slices/userSlice';


export const store = configureStore({
  reducer: {
    [cardsApi.reducerPath]: cardsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    cards: cardsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(cardsApi.middleware)
    .concat(userApi.middleware),
});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()


