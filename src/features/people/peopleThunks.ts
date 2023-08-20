import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api";
import { Person } from "../../types";

export const fetchNewPeople = createAsyncThunk(
  "people/fetchNewPeople",
  async (personURLs: string[]) => {
    const personIDs = personURLs.map(url => {
        const parts = url.split('/');
        const personID = parts[parts.length - 2];
        return personID;
      });
    const newPeopleResponses = await Promise.all(personIDs.map(ID => axiosInstance.get<Person>(`/people/${ID}`)));
    const newPeople = newPeopleResponses.map(response => response.data);
    return newPeople;
  }
);