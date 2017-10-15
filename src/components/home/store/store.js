import React, { Component } from 'react';

import Header from './header';
import OrderDetails from './order_details';
import * as Constants from '../../../util/constants';
import * as Db from '../../../util/db';

const STYLE = {
  backgroundColor: 'rgb(200, 200, 200)',
  position: 'absolute',
  top: Constants.HOME_HEADER_HEIGHT,
  width: '75%',
  zIndex: '100',
  overflowY: 'scroll',
};

/*
position: 'absolute',
top: '70px',
left: '0px',
right: '0px',
bottom: '0px',
overflowY: 'scroll'
*/

class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id : props.match.params.id,
      store : undefined,
    };
  }

  componentDidMount() {
    this.load();
  }

  load() {
    Db.get(this.state.id).then((response) => {
      this.setState({ store : response.data });
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    if (this.state.store === undefined) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <div>
        <Header src={this.state.store.images.banner}/>
        <div style={STYLE}>
          Store
        </div>
        <OrderDetails />
      </div>
    );
  }
}

export default Store;
