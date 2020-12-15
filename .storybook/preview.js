import React from 'react';
import { cache } from '../src/cache';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { BrowserRouter as Router } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../src/index.css';

export const client = new ApolloClient({
  cache: cache,
  link: createUploadLink({
    uri: 'http://localhost:8000/graphql'
  })
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
  ),
  (Story) => (
    <DndProvider backend={HTML5Backend}>
      <Story/>
    </DndProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
