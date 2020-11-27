import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'views/Home'

import Recipe from 'views/Recipe'
import RecipeEdit from 'views/RecipeEdit'
import RecipeCreate from 'views/RecipeCreate'
import Tag from 'views/Tag'
import Tags from 'views/Tags'
import About from 'views/About'

import Nav from 'views/Nav'
import Layout from 'views/layout/Layout'

//import { Navigation, Viewport, LayoutContainer } from 'views/layout/';

//import Routing from 'routing/Root';

/*function App() {
  return (
    <Router>
      <Routing/>
    </Router>
  );
}*/

function App() {
  return (
    <Router>
      <Nav/>
      <Layout>
        <Switch>
          <Route path="/recipe/new">
            <RecipeCreate/>
          </Route>
          <Route path="/recipe/edit/:id">
            <RecipeEdit/>
          </Route>
          <Route path="/recipe/:id">
            <Recipe/>
          </Route>
          <Route path="/tag/:id">
            <Tag/>
          </Route>
          <Route path="/tags">
            <Tags/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App;
