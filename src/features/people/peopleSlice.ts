// src/features/peopleSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { Person } from '../../types';
import { fetchNewPeople } from './peopleThunks';

const initialState: Person[] = [];

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeople: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewPeople.fulfilled, (state, action) => {
      state.push(...action.payload);
    });
  },
});

export const { setPeople } = peopleSlice.actions;
export default peopleSlice.reducer;
