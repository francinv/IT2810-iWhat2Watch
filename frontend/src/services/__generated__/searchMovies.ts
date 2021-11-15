/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchMovies
// ====================================================

export interface searchMovies_getMoviesBySearch {
  __typename: "Movie";
  id: string;
  title: string;
  genres: (string)[]
  release_date: number;
  overview: string;
  poster: string;
  favoritedByUser: (string)[];
}

export interface searchMovies {
  getMoviesBySearch: (searchMovies_getMoviesBySearch)[];
}

export interface searchMoviesVariables {
  page?: number;
  searchGenre?: (string)[];
  searchQuery?: string;
  searchDateStart?: number;
  searchDateEnd?: number;
  sortCriteria?: string;
}
