import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from "@apollo/client";
import { LOGIN_USER } from './utils/mutations.js';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

client.query(
  {
    query: gql`
    query Users {
      users {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          title
          description
          image
          link
        }
      }
    }
    `
  }
).then(result => console.log(result));

client.mutate(
  {
    mutation: LOGIN_USER
    , variables: {
      "username": "test",
      "email": "test@test.com",
      "password": "password"
    }
  }).then(result => console.log(result));

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
