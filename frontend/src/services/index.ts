import { apolloClient } from "../graphql";
import { searchMovies } from "./__generated__/searchMovies";
import { removeMovieAsFavorite } from "./__generated__/removeMovieAsFavorite";
import { setMovieAsFavorite } from "./__generated__/setMovieAsFavorite";
import { GET_MOVIES_BY_SEARCH } from "./movieQueries";
import { SET_FAVORITE_MOVIE } from "./movieQueries";
import { REMOVE_MOVIE_AS_FAVORITE } from "./movieQueries";

class MovieService {
  async getMoviesBySearch(
    page: number,
    searchQuery: String,
    searchGenre: String[],
    searchDateStart: number,
    searchDateEnd: number,
    sortCriteria: String
  ): Promise<searchMovies["getMoviesBySearch"]> {
    try {
      const response = await apolloClient.query({
        query: GET_MOVIES_BY_SEARCH,
        variables: {
          page: page,
          searchQuery: searchQuery,
          searchGenre: searchGenre,
          searchDateStart: searchDateStart,
          searchDateEnd: searchDateEnd,
          sortCriteria: sortCriteria,
        },
      });
      if (!response || !response.data) {
        throw new Error("Cannot get movies");
      }
      return response.data.getMoviesBySearch;
    } catch (error) {
      throw error;
    }
  }

  async removeFavorite(
    name: string,
    movie_id: string,
  ): Promise<string> {
    try {
      const response = await apolloClient.mutate({
        mutation: REMOVE_MOVIE_AS_FAVORITE,
        variables: {
          name: name,
          movie_id: movie_id
        },
      })
      if (!response || !response.data) {
        throw new Error("Cannot remove movie as favorite");
      }
      return response.data.removeMovieAsFavorite.title;
    } catch (error) {
      throw error;
    }
  }

  async setMovieAsFavorite(
    name: string,
    movie_id: string,
  ): Promise<string> {
    try {
      const response = await apolloClient.mutate({
        mutation: SET_FAVORITE_MOVIE,
        variables: {
          name: name,
          movie_id: movie_id
        },
      })
      if (!response || !response.data) {
        throw new Error("Cannot set this move as favorite");
      }
      return response.data.setMovieAsFavorite.title;
    } catch (error) {
      throw error;
    }
  }
}

export default new MovieService();
