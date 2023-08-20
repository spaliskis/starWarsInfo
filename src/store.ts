import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from './features/filmsSlice';
import peopleReducer from './features/people/peopleSlice';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    films: filmsReducer,
    people: peopleReducer,
  },
});

export default store;