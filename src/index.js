import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import CssBaseline from '@material-ui/core/CssBaseline';
//import store from './store/configureStore';
import { cache } from './cache';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';

import Theme from './theme';

library.add(fas);
library.add(far);
library.add(fal);

export const client = new ApolloClient({
  cache: cache,
  link: createUploadLink({
    uri: 'http://localhost:8000/graphql'
  })
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Theme>
        <CssBaseline />
        <App />
      </Theme>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

/*ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
