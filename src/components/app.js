import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/home';
import Admin from './admin/admin';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Admin}/>
    </Switch>
  );
};

export default App;
