import { gql } from "apollo-server-express";

const typeDefs = gql`

  type Query {
    getMoviesBySearch(
      searchDateStart: Int
      searchDateEnd: Int
      searchQuery: String
      searchGenre: [String]
      page: Int
      sortCriteria: String
      favoritedByUser: [String]
    ): [Movie]
  }

  type Movie {
      id:ID
      title: String
      release_date: Float
      genres: [String]
      overview: String
      poster: String
      favoritedByUser: [String]
  }

  type Mutation { 
      setMovieAsFavorite(name: String, movie_id: String): Movie
      removeMovieAsFavorite(name: String, movie_id: String): Movie
  }
`;

module.exports = typeDefs;
