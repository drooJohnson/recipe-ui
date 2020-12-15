import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import AdminScene from 'views/admin/AdminScene'

import ActionsScene from 'views/admin/Action/ActionsScene'
import ActionDetailScene from 'views/admin/Action/ActionDetailScene'
import PlayersScene from 'views/admin/Player/PlayersScene'
import PlayerDetailScene from 'views/admin/Player/PlayerDetailScene'
import NewPlayerScene from 'views/admin/Player/NewPlayerScene'
import WorldZonesScene from 'views/admin/WorldZone/Scenes/WorldZonesScene'

import Layout from 'views/admin/Layout/Layout'

const AdminRoutes = () => {
  let { path, url } = useRouteMatch();
  return(
    <Layout>
      <Switch>
        <Route exact path={`${path}/players`}><PlayersScene /></Route>
        <Route path={`${path}/players/new`}><NewPlayerScene /></Route>
        <Route path={`${path}/players/:id`}><PlayerDetailScene/></Route>
        <Route exact path={`${path}/worldtiles`}><div>PROFILE ROUTE</div></Route>
        <Route path={`${path}/worldtiles/:id`}><div>PROFILE ROUTE</div></Route>
        <Route exact path={`${path}/worldtileexits`}><div>PROFILE ROUTE</div></Route>
        <Route path={`${path}/worldtileexits/:id`}><div>PROFILE ROUTE</div></Route>
        <Route exact path={`${path}/worldzones`}><WorldZonesScene/></Route>
        <Route path={`${path}/worldzones/:id`}><div>PROFILE ROUTE</div></Route>
        <Route exact path={`${path}/actions`}><ActionsScene/></Route>
        <Route path={`${path}/actions/:id`}><ActionDetailScene/></Route>
        <Route exact path={`${path}`}><Redirect to={`${path}/home`} /></Route>
        <Route path={`${path}/home`}>
          <AdminScene/>
        </Route>
      </Switch>
    </Layout>
  )
}

export default AdminRoutes;
