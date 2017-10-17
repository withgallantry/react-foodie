import React, { Component } from 'react';

import Header from './header';
import Order from './order';
import Menu from './menu';
import * as Constants from '../../../util/constants';
import * as Cookies from '../../../util/cookies';
import * as Db from '../../../util/db';
import * as Event from './event';
import * as Language from '../../../util/localization/language';
import * as Settings from '../../../util/settings';
import * as Util from '../../../util/util';

const STYLE = {
  position: 'absolute',
  top: Constants.HOME_HEADER_HEIGHT,
  left: '0px',
  right: '0px',
  bottom: '0px',
  border: '1px solid gray',
  width: Constants.HOME_STORE_WIDTH,
  overflowY: 'scroll',
};

const HR_STYLE = {
  margin: 0,
  padding: 0
};

const COOKIE_PREFIX = 'items_';

class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id : props.match.params.id,
      store : undefined,
      orderItems : []
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  load() {
    Db.get(this.state.id).then((response) => {
      this.setState({ store : response.data });
      this.getCookies();
    }).catch((error) => {
      console.log(error);
    });
  }

  getCookies() {
    const store = this.state.store;
    let orderItems = [];
    let cookie = Cookies.get(`${COOKIE_PREFIX}${store._id}`);
    for (let i in cookie) {
      if (cookie.hasOwnProperty(i)) {
        let item = cookie[i];
        let storeItem = store.menu[Settings.get(Settings.LANGUAGE)][item.m].items[item.i];
        orderItems.push({
          name: storeItem.name,
          price: storeItem.price,
          quantity: item.q,
          menuIndex: item.m,
          itemIndex: item.i,
          id: Util.generateKey()
        });
      }
    }
    this.setState({ orderItems });
  }

  goToMenu(menuIndex) {

  }

  addItem(menuIndex, itemIndex) {
    let orderItems = this.state.orderItems;
    const LANGUAGE = Settings.get(Settings.LANGUAGE);
    let item = this.state.store.menu[LANGUAGE][menuIndex].items[itemIndex];
    const index = _.findIndex(orderItems, (item) => {
      return item.menuIndex === menuIndex && item.itemIndex === itemIndex;
    })
    if (index >= 0) {
      ++orderItems[index].quantity;
    } else {
      orderItems.push({
        name : item.name,
        price : item.price,
        quantity : 1,
        menuIndex : menuIndex,
        itemIndex : itemIndex,
        id : Util.generateKey(),
      });
    }
    this.updateCookies(1, menuIndex, itemIndex);
    this.setState({ orderItems });
  }

  removeItem(menuIndex, itemIndex) {

  }

  updateCookies(inc, menuIndex, itemIndex) {
    const storeId = this.state.store._id;
    let items = Cookies.get(`${COOKIE_PREFIX}${storeId}`);
    if (! items) {
      items = [];
    }
    const match = _.findIndex(items, (item) => {
      return item.m === menuIndex && item.i === itemIndex;
    })
    if (match >= 0) {
      items[match].q += inc;
      if (items[match].q <= 0) {
        items.splice(match, 1);
      }
    } else {
      if (inc > 0) {
        items.push({
          m : menuIndex,
          i : itemIndex,
          q : 1
        });
      }
    }
    Cookies.set(`${COOKIE_PREFIX}${storeId}`, items);
  }

  onClick(id, args) {
    console.log(`onClick(${id}, ${args})`);
    if (id === Event.GO_TO_MENU) {
      this.goToMenu(...args);
    } else if (id === Event.ADD_ITEM) {
      this.addItem(...args);
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
      <div>
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
        </div>
        <Order items={this.state.orderItems} />
      </div>
    );
  }
}

export default Store;
