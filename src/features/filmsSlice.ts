// src/features/peopleSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { Film } from '../types';

const initialState: Film[] = [];

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilms: (_, action) => {
      return action.payload;
    },
  },
});

export const { setFilms } = filmsSlice.actions;
export default filmsSlice.reducer;
