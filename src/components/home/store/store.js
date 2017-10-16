import React, { Component } from 'react';

import Header from './header';
import Order from './order';
import Menu from './menu';
import * as Constants from '../../../util/constants';
import * as Db from '../../../util/db';
import * as Language from '../../../util/localization/language';
import * as Settings from '../../../util/settings';

// const STYLE = {
//   backgroundColor: 'rgb(200, 200, 200)',
//   position: 'absolute',
//   top: Constants.HOME_HEADER_HEIGHT,
//   width: Constants.HOME_STORE_WIDTH,
//   zIndex: '100',
//   overflowY: 'scroll',
// };

const STYLE = {
  border: '1px solid gray',
  width: Constants.HOME_STORE_WIDTH,
};

const HR_STYLE = {
  margin: 0,
  padding: 0
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
      order : undefined,
    };

    this.onClick = this.onClick.bind(this);
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

  onClick(id, arg) {
    console.log(`onClick(${id}, ${arg})`);
    if (id === Event.GO_TO_MENU_ITEM) {

    }
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
      <div style={STYLE}>
        <Header
          img={this.state.store.images.banner}
          store={this.state.store}
        />
        <hr style={HR_STYLE}/>
        <Menu
          items={
            Settings.get(Settings.LANGUAGE) === Language.SV
              ? this.state.store.menu.sv
              : this.state.store.menu.en
          }
          onClick={this.onClick}
        />
        <Order order={this.state.order} />
      </div>
    );
  }
}

export default Store;
