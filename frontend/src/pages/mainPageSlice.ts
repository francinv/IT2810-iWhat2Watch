import { createSlice } from "@reduxjs/toolkit";
import { IMoviesList } from "../services/types";

const initialState: IMoviesList = {
  movies: [],
  loading: false,
  nextPage: 0,
  filterSearch: "",
  filterGenre: ["Action"],
  filterDateStart: -1635203598,
  filterDateEnd: 1635203598,
  sortByCriteria: "",
};

/* Redux toolkit reducers with action and reducer in one method */
const MainPageSlice = createSlice({
  name: "mainPage",
  initialState,
  reducers: {
    setMovies(state, action) {
      state.nextPage += 1;
      if (state.movies !== null) {
        state.movies = state.movies.concat(action.payload);
      }
    },
    setSortByCriteria(state, action) {
      state.nextPage = 0;
      state.movies = [];
      state.sortByCriteria = action.payload;
    },
    setFilterDates(state, action) {
      state.nextPage = 0;
      state.movies = [];
      state.filterDateStart = action.payload[0];
      state.filterDateEnd = action.payload[1];
    },
    setSearchQuery(state, action) {
      state.nextPage = 0;
      state.movies = [];
      state.filterSearch = action.payload;
    },
    setFilterGenres(state, action) {
      state.nextPage = 0;
      state.movies = [];
      if (state.filterGenre === [""]) {
        state.filterGenre = []
      }
      state.filterGenre = action.payload;
    },
  },
});

export const {
  setMovies,
  setSortByCriteria,
  setFilterGenres,
  setFilterDates,
  setSearchQuery,
} = MainPageSlice.actions;
export default MainPageSlice.reducer;
