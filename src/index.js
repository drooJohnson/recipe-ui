import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import auth from './Auth';

import {BrowserRouter as Router} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
//import store from './store/configureStore';
import { cache } from './cache';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { createUploadLink } from 'apollo-upload-client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Theme from './theme';

const authLink = setContext( async (_, {headers}) => {
  let token = await auth.getIdToken();
  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
})

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URI
})

export const client = new ApolloClient({
  cache: cache,
  uri: process.env.REACT_APP_GRAPHQL_URI,
  link: authLink.concat(uploadLink)
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Theme>
        <CssBaseline />
        <Router>
          <App />
        </Router>
        <ToastContainer/>
      </Theme>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
