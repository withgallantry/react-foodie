import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Form from './form';
import Menu from './menu';
import { getTemplateItems } from '../../util/util';
import Event, { propToEvent } from './event';
import { URL } from '../../util/constants';
import Config, { getConfig, setConfig } from '../../util/config';

class Admin extends Component {
  constructor() {
    super();

    this.state = this.getDefaultState();

    this.onClick = this.onClick.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeSearchDebounced = _.debounce(this.onChangeSearch, 300);
    this.onChangeKey = this.onChangeKey.bind(this);
    this.onChangeKeyDebounced = _.debounce(this.onChangeKey, 300);

    this.events = [];
    const assign = (array, func, id) => {
      func = func.bind(this);
      array[id] = func;
    }

    // assign functors for events
    assign(this.events, this.new,              Event.NEW);
    assign(this.events, this.save,             Event.SAVE);
    assign(this.events, this.copy,             Event.COPY);
    assign(this.events, this.show,             Event.SHOW);
    assign(this.events, this.delete,           Event.DELETE);
    assign(this.events, this.addTemplate,      Event.ADD_TEMPLATE);
    assign(this.events, this.removeMenuItem,   Event.REMOVE_MENU_ITEM);
    assign(this.events, this.removeMenu,       Event.REMOVE_MENU);
    assign(this.events, this.newMenuItem,      Event.NEW_MENU_ITEM);
    assign(this.events, this.newMenu,          Event.NEW_MENU);
    assign(this.events, this.moveMenuItemUp,   Event.MOVE_MENU_ITEM_UP);
    assign(this.events, this.moveMenuItemDown, Event.MOVE_MENU_ITEM_DOWN);
    assign(this.events, this.moveMenuUp,       Event.MOVE_MENU_UP);
    assign(this.events, this.moveMenuDown,     Event.MOVE_MENU_DOWN);
    assign(this.events, this.deleteAll,        Event.DELETE_ALL);
  }

  componentDidMount() {
    this.load((foodPlaces) => {
      if (foodPlaces.length > 0) {
        this.show(foodPlaces[0]._id);
      }
    });
  }

  clearForm() {
    var state = this.getDefaultState();
    state.foodPlaces = this.state.foodPlaces;
    this.setState(state);
  }

  getDefaultState() {
    return {
      foodPlaces: [],
      lang: '',
      name: '',
      address: '',
      hours: [],
      tags: [],
      deleteEnabled: true,
      deleteAllEnabled: true,
      images: null,
      menu: null,
      currentId: null
    };
  }

  getCurrentItem() {
    return {
      lang: this.state.lang,
      name: this.state.name,
      address: this.state.address,
      hours: this.state.hours.constructor === Array
        ? this.state.hours
        : this.state.hours.replace(/\s/g,'').split(','),
      tags: this.state.tags.constructor === Array
        ? this.state.tags
        : this.state.tags.replace(/\s/g,'').split(','),
      menu: this.state.menu,
      images: this.state.images,
      modified: new Date().toISOString()
    };
  }

  getUrl(id) {
    if (id !== undefined) {
      return `${URL}/${getConfig(Config.KEY)}/${id}`;
    }
    return `${URL}/${getConfig(Config.KEY)}`;
  }

  load(onFinished) {
    axios.get(this.getUrl()).then((response) => {
      const foodPlaces = _.map(response.data, (foodPlace) => {
        return {
          lang: foodPlace.lang,
          name: foodPlace.name,
          address: foodPlace.address,
          hours: foodPlace.hours,
          tags: foodPlace.tags,
          menu: foodPlace.menu,
          images: foodPlace.images,
          _id: foodPlace._id
        };
      });

      this.setState({ foodPlaces });
      if (onFinished) {
        onFinished(foodPlaces);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  save() {
    var currentId = this.state.currentId;
    if (currentId !== null) {
      axios.put(`${URL}/${currentId}`, this.getCurrentItem()).then((response) => {
        console.log(`updated food place with id ${currentId}`);
        this.load();
      }).catch((error) => {
        console.log(error);
      });
    } else {
      axios.post(this.getUrl(), this.getCurrentItem()).then((response) => {
        console.log('added food place');
        this.load();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  show(args) {
    var id = args;
    if (args.constructor === Array) {
      id = args[0];
    }
    var foodPlace = _.find(this.state.foodPlaces, (foodPlace) => {
      return foodPlace._id === id;
    });
    if (foodPlace) {
      this.setState({
        lang: foodPlace.lang,
        name: foodPlace.name,
        address: foodPlace.address,
        hours: foodPlace.hours,
        tags: foodPlace.tags,
        images: foodPlace.images,
        menu: foodPlace.menu,
        currentId: id
      });
    }
  }

  copy() {
    var item = this.getCurrentItem();
    item.name = `${item.name} (copy)`;
    axios.post(this.getUrl(), item).then((response) => {
      console.log('added food place');
      this.load((foodplaces) => {
        var match = _.find(foodplaces, (obj) => {
          return obj._id === response.data[0]._id;
        });
        if (match) {
          this.show(match._id);
        }
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  delete() {
    const currentId = this.state.currentId;
    var index = _.findIndex(this.state.foodPlaces, (obj) => {
      return obj._id === currentId;
    });
    if (currentId) {
      this.setState({ deleteEnabled : false });
      axios.delete(`${URL}/${currentId}`).then((response) => {
        console.log(`deleted food place with id ${currentId}`);
        this.load((foodPlaces) => {
          this.setState({ deleteEnabled : true });
          if (foodPlaces.length > 0) {
            if (index >= 1) {
              this.show(foodPlaces[index - 1]._id);
            } else {
              this.show(foodPlaces[0]._id);
            }
          } else {
            this.clearForm();
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  deleteAll() {
    if (this.state.foodPlaces.length > 0) {
      this.setState({ deleteAllEnabled : false });

      axios.delete(`${this.getUrl()}/deleteAll`).then((response) => {
        this.clearForm();
        this.setState({ foodPlaces : [] });
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  addTemplate() {
    axios.post(this.getUrl(), getTemplateItems()).then((response) => {
      console.log('added food place');
      this.load((foodPlaces) => {
        var match = _.find(foodPlaces, (obj) => {
          return obj._id === response.data[0]._id;
        });
        if (match) {
          this.show(match._id);
        }
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  new() {
    this.clearForm();
  }

  changeMenuItem(menuIndex, itemIndex, prop, value) {
    var menu = this.state.menu;
    menu[menuIndex].items[itemIndex][prop] = value;
    this.setState({ menu });
  }

  changeMenuName(menuIndex, value) {
    var menu = this.state.menu;
    menu[menuIndex].name = value;
    this.setState({ menu });
  }

  removeMenuItem(args) {
    const menuIndex = args[0];
    const itemIndex = args[1];
    var menu = this.state.menu;
    menu[menuIndex].items.splice(itemIndex, 1);
    this.setState({ menu });
  }

  removeMenu(args) {
    const menuIndex = args[0];
    var menu = this.state.menu;
    menu.splice(menuIndex, 1);
    this.setState({ menu });
  }

  newMenuItem(args) {
    const menuIndex = args[0];
    var menu = this.state.menu;
    menu[menuIndex].items.push({
      name :  '',
      desc :  '',
      price : ''
    });
    this.setState({ menu });
  }

  newMenu() {
    var menu = this.state.menu;
    if (! menu) {
      menu = [];
    }
    menu.push({
      name  : '',
      items : []
    });
    this.setState({ menu })
  }

  moveMenuItemUp(args) {
    var menu = args[0];
    var item = args[1];
    var menus = this.state.menu;
    menu = menus[menu];
    if (menu.items.length > 1) {
      var target = item - 1;
      if (target < 0) {
        target = menu.items.length - 1;
      }
      var temp = menu.items[target];
      menu.items[target] = menu.items[item];
      menu.items[item] = temp;
      this.setState({ menu : menus });
    }
  }

  moveMenuItemDown(args) {
    var menu = args[0];
    var item = args[1];
    var menus = this.state.menu;
    menu = menus[menu];
    if (menu.items.length > 1) {
      var target = item + 1;
      if (target >= menu.items.length) {
        target = 0;
      }
      var temp = menu.items[target];
      menu.items[target] = menu.items[item];
      menu.items[item] = temp;
      this.setState({ menu : menus });
    }
  }

  moveMenuUp(args) {
    var index = args[0];
    var menu = this.state.menu;
    if (menu.length > 1) {
      var target = index - 1;
      if (target < 0) {
        target = menu.length - 1;
      }
      var temp = menu[target];
      menu[target] = menu[index];
      menu[index] = temp;
      this.setState({ menu });
    }
  }

  moveMenuDown(args) {
    var index = args[0];
    var menu = this.state.menu;
    if (menu.length > 1) {
      var target = index + 1;
      if (target >= menu.length) {
        target = 0;
      }
      var temp = menu[target];
      menu[target] = menu[index];
      menu[index] = temp;
      this.setState({ menu });
    }
  }

  onClick(id, args) {
    if (args) {
      console.log(`onClick[${id}](${args[0]}, ${args[1]}, ${args[2]})`);
    } else {
      console.log(`onClick[${id}](undefined)`);
    }

    this.events[id](args);
  }

  onChangeForm(value, args) {
    var label = args[0];
    var event = propToEvent(label);
    console.log(`onChangeForm(${value}, ${args})[event=${event}]`);

    // events where only prop and value is needed
    const events = [
      Event.LANG_CHANGE, Event.NAME_CHANGE,
      Event.TAGS_CHANGE, Event.HOURS_CHANGE, Event.ADDRESS_CHANGE];

    if (events.includes(event)) {
      this.setState({ [label] : value })
    } else if (event === Event.IMAGES_GALLERY_CHANGE) {
      var images = this.state.images;
      images.gallery = value;
      this.setState({ images });
    }
    else if (event === Event.IMAGES_BANNER_CHANGE) {
      var images = this.state.images;
      images.banner = value;
      this.setState({ images });
    }
    else if (label === Event.CHANGE_MENU_ITEM) {
      this.changeMenuItem(args[1], args[2], args[3], value);
    } else if (label === Event.CHANGE_MENU_NAME) {
      this.changeMenuName(args[1], value);
    }
  }

  onChangeSearch(value) {
    value = value.toLowerCase();
    const foodPlaces = this.state.foodPlace;
    var index = _.findIndex(this.state.foodPlaces, (foodPlace) => {
      var name = `${foodPlace.name} (${foodPlace.lang})`.toLowerCase();
      return _.includes(name, value);
    });
    if (index >= 0) {
      this.show(this.state.foodPlaces[index]._id);
    }
  }

  onChangeKey(value) {
    value = value.replace(/\s/g,'');
    console.log(value);
    if (value.length > 0) {
        setConfig(Config.KEY, value);
        this.clearForm();
        this.load((foodPlaces) => {
          if (foodPlaces.length > 0) {
            this.show(foodPlaces[0]._id);
          }
        });
    }
  }

  render() {
    return (
      <div>
        <Menu
          onClick={this.onClick}
          onChangeSearch={this.onChangeSearchDebounced}
          onChangeKey={this.onChangeKeyDebounced}
          foodPlaces={
            _.map(this.state.foodPlaces, (foodPlace) => {
              return {
                name: foodPlace.name,
                id:   foodPlace._id,
                lang: foodPlace.lang
              };
            })
          }
          deleteEnabled={this.state.deleteEnabled}
          deleteAllEnabled={this.state.deleteAllEnabled}
          _key={getConfig(Config.KEY)}
        />
        <hr />
        <Form
          singleInput={{
            lang: this.state.lang,
            name: this.state.name,
            tags: this.state.tags,
            images: this.state.images,
            address: this.state.address,
            hours: this.state.hours
          }}
          menu={this.state.menu}
          onClick={this.onClick}
          onChange={this.onChangeForm}
        />
      </div>
    );
  }
}

export default Admin;
