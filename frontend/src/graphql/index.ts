import { ApolloClient, InMemoryCache } from "@apollo/client";
import "dotenv/config"

export const apolloClient = new ApolloClient({
  uri: process.env.DB_URL ? process.env.DB_URL : "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
