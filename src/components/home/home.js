import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Store from './store';
import Header from './header';
import Gallery from './gallery';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressSearch : '',
      storeSearch : '',
    };
  }

  onChange() {

  }

  render() {
    return (
      <div>
        <Header
          onChange={this.onChange}
          search={this.state.addressSearch}
        />
        <hr />
        <Switch>
          <Route exact path='/store' component={Store}/>
          <Route exact path='/gallery' component={Gallery}/>
          <Redirect from='/' to='gallery'/>
        </Switch>
      </div>
    );
  }
}

export default Home;
