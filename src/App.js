import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'views/Home'

import Recipe from 'views/Recipe'
import Recipes from 'views/Recipes'
import RecipeEdit from 'views/RecipeEdit'
import RecipeCreate from 'views/RecipeCreate'

import Tag from 'views/Tag'
import Tags from 'views/Tags'
import TagEdit from 'views/TagEdit'
import TagCreate from 'views/TagCreate'

import About from 'views/About'

import Nav from 'views/Nav'
import Layout from 'views/layout/Layout'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
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
          <Route path="/recipes">
            <Recipes/>
          </Route>
          <Route path="/tag/new">
            <TagCreate/>
          </Route>
          <Route path="/tag/edit/:id">
            <TagEdit/>
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
      </DndProvider>
    </Router>
  )
}

export default App;
