import React, { Component } from 'react';

import Header from './header';
import LoadingBar from '../../shared/loading_bar';
import Menu from './menu';
import Order from './order';
import ScrollButton from './scroll_button';
import * as Constants from '../../../misc/constants';
import * as Cookies from '../../../misc/cookies';
import * as Debug from '../../../misc/debug';
import * as Db from '../../../misc/db';
import * as Event from './event';
import * as Language from '../../../misc/localization/language';
import * as Settings from '../../../misc/settings';
import * as Util from '../../../misc/util';

const STYLE = {
  position: 'absolute',
  top: Constants.HOME_HEADER_HEIGHT,
  left: '0px',
  right: '0px',
  bottom: '0px',
  width: Constants.HOME_STORE_WIDTH,
  overflowY: 'scroll',
};

const HR_STYLE = {
  margin: 0,
  padding: 0
};

class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id : props.match.params.id,
      store : undefined,
      orderItems : [],
      language : props.language,
      switched : false,
      showMenuForItem : undefined,
      showScrollButton : false,
    };

    this.onClick = this.onClick.bind(this);
    this.onToggleSwitch = this.onToggleSwitch.bind(this);
    this.onOrderItemLeave = this.onOrderItemLeave.bind(this);
    this.onOrderItemEnter = this.onOrderItemEnter.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  componentWillReceiveProps(props) {
    if (props.language !== this.state.language) {
      this.setState({ language : props.language });
      this.getCookies(props.language);
    }
    if (this.state.id !== props.match.params.id) {
      this.load(props.match.params.id);
    }
  }

  onScroll() {
    const scrollTop = document.getElementById(Constants.STORE_ID).scrollTop;
    if (scrollTop >= Constants.SCROLL_THRESHOLD) {
      if (this.state.showScrollButton !== true) {
        this.setState({ showScrollButton : true });
      }
    } else {
      if (this.state.showScrollButton !== false) {
        this.setState({ showScrollButton : false });
      }
    }
  }

  load(id) {
    Db.get(id = id === undefined ? this.state.id : id).then((response) => {
      this.setState({ store : response.data });
      this.getCookies();
    }).catch((error) => {
      console.error(error);
    });
  }

  getCookies(language) {
    const store = this.state.store;
    let orderItems = [];
    let cookie = Cookies.get(`${Constants.COOKIE_ITEMS}${store._id}`);
    for (let i in cookie) {
      if (cookie.hasOwnProperty(i)) {
        let item = cookie[i];
        const lang = language === undefined ? this.state.language : language;
        let storeItem = store.menu[lang][item.m].items[item.i];
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

  scrollToMenu(menuIndex) {
    const element = document.getElementById(`subMenu${menuIndex}`);
    element.scrollIntoView(true);
  }

  scrollToTop() {
    const element = document.getElementById(Constants.TOP_ID);
    element.scrollIntoView(true);
  }

  addItem(menuIndex, itemIndex) {
    let orderItems = this.state.orderItems;
    const language = Settings.get(Settings.LANGUAGE);
    let item = this.state.store.menu[language][menuIndex].items[itemIndex];
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
    this.props.onOrderChange(this.state.store._id);
    this.setState({ orderItems });
  }

  removeItem(menuIndex, itemIndex) {
    this.props.onOrderChange(this.state.store._id);
  }

  updateCookies(inc, menuIndex, itemIndex) {
    const storeId = this.state.store._id;
    let items = Cookies.get(`${Constants.COOKIE_ITEMS}${storeId}`);
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
    Cookies.set(`${Constants.COOKIE_ITEMS}${storeId}`, items);
  }

  onOrderItemEnter(id) {
    this.setState({ showMenuForItem : id });
  }

  onOrderItemLeave() {
    this.setState({ showMenuForItem : undefined });
  }

  increaseItem(id) {
    this.updateItemQuantity(1, id);
  }

  decreaseItem(id) {
    this.updateItemQuantity(-1, id);
  }

  updateItemQuantity(quantity, id) {
    const orderItems = this.state.orderItems;
    const index = _.findIndex(orderItems, (item) => {
      return item.id === id;
    })
    if (index >= 0) {
      let item = orderItems[index];
      item.quantity += quantity;
      if (item.quantity <= 0) {
        this.removeItem(id);
      } else {
        this.setState({ orderItems });
        this.updateCookies(quantity, item.menuIndex, item.itemIndex);
      }
    }
  }

  removeItem(id) {
    const orderItems = this.state.orderItems;
    const index = _.findIndex(orderItems, (item) => {
      return item.id === id;
    })
    if (index >= 0) {
      this.updateCookies(
        Number.MIN_SAFE_INTEGER,
        orderItems[index].menuIndex,
        orderItems[index].itemIndex);
      if (orderItems.length - 1 > index) {
        this.setState({ showMenuForItem : orderItems[index + 1].id });
      }
      orderItems.splice(index, 1);
      this.setState({ orderItems });
    }
  }

  onToggleSwitch() {
    const switched = !this.state.switched;
    this.setState({ switched });
  }

  onClick(id, args) {
    Debug.log(`onClick(${id}, ${args})`);
    if (id === Event.SCROLL_TO_MENU) {
      this.scrollToMenu(...args);
    } else if (id === Event.ADD_ITEM) {
      this.addItem(...args);
    } else if (id === Event.INCREASE_ITEM) {
      this.increaseItem(...args);
    } else if (id === Event.DECREASE_ITEM) {
      this.decreaseItem(...args);
    } else if (id === Event.REMOVE_ITEM) {
      this.removeItem(...args);
    } else if (id === Event.SCROLL_TO_TOP) {
      this.scrollToTop();
    }
  }

  render() {
    if (this.state.store === undefined) {
      return (<LoadingBar />);
    }

    return (
      <div>
        <div id={Constants.STORE_ID} style={STYLE} onScroll={this.onScroll}>
          <Header
            img={this.state.store.images.banner}
            store={this.state.store}
          />
          <hr style={HR_STYLE}/>
          <Menu
            items={
              this.state.language === Language.SV
                ? this.state.store.menu.sv
                : this.state.store.menu.en
            }
            onClick={this.onClick}
          />
          {this.state.showScrollButton && <ScrollButton onClick={this.onClick}/>}
        </div>
        <Order
          onClick={this.onClick}
          showMenuForItem={this.state.showMenuForItem}
          onEnter={this.onOrderItemEnter}
          onLeave={this.onOrderItemLeave}
          onToggleSwitch={this.onToggleSwitch}
          switched={this.state.switched}
          address={this.props.address}
          name={this.state.store.name}
          items={this.state.orderItems}
          language={this.state.language}/>
      </div>
    );
  }
}

export default Store;
