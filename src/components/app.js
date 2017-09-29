import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './home/home';
import Admin from './admin/admin';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/admin' component={Admin}/>
        <Route path='/' component={Home}/>
      </Switch>
    </div>
  );
};

export default App;
