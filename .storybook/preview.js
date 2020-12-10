import React from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import '../src/index.css';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
});

export const decorators = [
  (Story) => (
    <Router>
      <Story/>
    </Router>
  ),
  (Story) => (
    <ApolloProvider client={client}>
      <Story/>
    </ApolloProvider>
  )
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
