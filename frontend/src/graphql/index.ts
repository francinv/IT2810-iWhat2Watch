import { ApolloClient, InMemoryCache } from "@apollo/client";


//console.log(process.env.DB_URL)
export const apolloClient = new ApolloClient({
  uri: "http://it2810-29.idi.ntnu.no:4000/graphql",
  //uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
