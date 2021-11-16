import { ApolloClient, InMemoryCache } from "@apollo/client";
import {DB_URL} from "@env";

export const apolloClient = new ApolloClient({
  uri: DB_URL ? DB_URL : "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
