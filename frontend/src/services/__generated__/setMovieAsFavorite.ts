/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setMovieAsFavorite
// ====================================================

export interface setMovieAsFavorite_setMovieAsFavorite {
  __typename: "Movie";
  favoritedByUser: (string)[];
}

export interface setMovieAsFavorite {
  setMovieAsFavorite: setMovieAsFavorite_setMovieAsFavorite;
}

export interface setMovieAsFavoriteVariables {
  name?: string;
  movie_id?: string;
}
