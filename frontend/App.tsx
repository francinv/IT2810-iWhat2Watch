import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./src/graphql";
import { store } from './src/services/store';
import { Provider } from 'react-redux';
import {MainPage} from './src/pages/MainPage';

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}> 
        <MainPage />
      </ApolloProvider>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
