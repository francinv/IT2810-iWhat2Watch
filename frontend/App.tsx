import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./src/graphql";
import { store } from './services/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}> 
          <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
          </View>
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
