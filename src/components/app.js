import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Admin from './admin/admin';
import Home from './home/home';
import Json from './json';
import * as Settings from '../misc/settings';

const App = () => {
  Settings.set(Settings.DEBUG, true);
  return (
    <div>
      <Switch>
        <Route exact path='/json' component={Json}/>
        <Route exact path='/admin' component={Admin}/>
        <Route path='/' component={Home}/>
      </Switch>
    </div>
  );
};

export default App;
