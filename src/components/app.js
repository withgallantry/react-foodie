import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './home/home';
import Admin from './admin/admin';
import Json from './json';
import AddressSearchBar from './shared/address_search_bar';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/json' component={Json}/>
        <Route exact path='/admin' component={Admin}/>
        <Route exact path='/search' component={AddressSearchBar}/>
        <Route path='/' component={Home}/>
      </Switch>
    </div>
  );
};

export default App;
