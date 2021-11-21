import { ApolloClient, InMemoryCache } from "@apollo/client";
import {DB_URL} from "@env";
//import "dotenv/config"


//console.log(process.env.DB_URL)
console.log(DB_URL)
export const apolloClient = new ApolloClient({
  uri: process.env.DB_URL ? process.env.DB_URL : "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
