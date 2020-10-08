import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import AdminScene from 'views/admin/AdminScene'

import ActionsScene from 'views/admin/Action/ActionsScene'
import ActionDetailScene from 'views/admin/Action/ActionDetailScene'

const AdminRoutes = () => {
  let { path, url } = useRouteMatch();
  return(
    <Switch>
      <Route path={`${path}/players`}><div>PROFILE ROUTE</div></Route>
      <Route path={`${path}/player/:id`}><div>PROFILE ROUTE</div></Route>
      <Route path={`${path}/worldtiles`}><div>PROFILE ROUTE</div></Route>
      <Route path={`${path}/worldtile/:id`}><div>PROFILE ROUTE</div></Route>
      <Route path={`${path}/worldtileexits`}><div>PROFILE ROUTE</div></Route>
      <Route path={`${path}/worldtileexit/:id`}><div>PROFILE ROUTE</div></Route>
      <Route path={`${path}/worldzones`}><div>PROFILE ROUTE</div></Route>
      <Route path={`${path}/worldzone/:id`}><div>PROFILE ROUTE</div></Route>
      <Route path={`${path}/actions`}><ActionsScene/></Route>
      <Route path={`${path}/action/:id`}><ActionDetailScene/></Route>
      <Route path={`${path}/`}>
        <AdminScene/>
      </Route>
    </Switch>
  )
}

export default AdminRoutes;
