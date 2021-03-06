import React, {Component} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import GuardedRoute from './GuardedRoute'
import Home from './views/Home'

import Recipe from './views/Recipe'
import Recipes from './views/Recipes'
import RecipeEdit from './views/RecipeEdit'
import RecipeCreate from './views/RecipeCreate'

import Tag from './views/Tag'
import Tags from './views/Tags'
import TagEdit from './views/TagEdit'
import TagCreate from './views/TagCreate'

import About from './views/About'

import Callback from './views/Callback'
import Login from './views/Login'

import NotFound from './views/NotFound'

import Admin from './views/Admin'

import Nav from './views/Nav'
import Layout from './views/layout/Layout'

import auth from './Auth'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class App extends Component {
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
  }

  render() {
    return (
      <>
        <DndProvider backend={HTML5Backend}>
          <Nav />
          <Layout>
            <Switch>
              <GuardedRoute path="/recipe/new" component={RecipeCreate} />
              <GuardedRoute path="/recipe/edit/:slug" component={RecipeEdit} />
              <Route path="/recipe/:slug">
                <Recipe />
              </Route>
              <Route path="/recipes">
                <Recipes />
              </Route>
              <GuardedRoute path="/admin" component={Admin} />
              <GuardedRoute path="/tag/new" component={TagCreate} />
              <GuardedRoute path="/tag/edit/:id" component={TagEdit} />
              <Route path="/tag/:id">
                <Tag />
              </Route>
              <Route path="/tags">
                <Tags />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/callback" component={Callback} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/404" component={NotFound} />
            </Switch>
          </Layout>
          {auth.isAuthenticated() && (
            <div style={{ position: "absolute", right: 10, bottom: 10 }}>
              <Fab color="primary" href="/recipe/new">
                <AddIcon />
              </Fab>
            </div>
          )}
        </DndProvider>
      </>
    );
  }
}

export default withRouter(App);
