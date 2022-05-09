import React from "react";

import { Route, Switch } from "react-router-dom";

export default (
  <Switch>
    <Route path='/' />
    <Route path='/review' />
    <Route path='/payment' />
    <Route path='/hostels' />
    <Route path='/trips' />
    <Route path='/workations' />
    <Route path='/orders' />
    <Route path='/booking' />
    <Route path='/policies' />
    <Route path='/partner' />
    <Route path='/aboutus' />
    <Route path='/:type/:name' />
  </Switch>
);
