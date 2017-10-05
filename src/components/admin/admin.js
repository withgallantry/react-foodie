import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Form from './form';
import Menu from './menu';
import { getTemplateItems } from '../../util/util';
import Event, { propToEvent } from './event';
import { URL } from '../../util/constants';
import Config, { getConfig, setConfig } from '../../util/config';
import Language from '../../util/localization/language';

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
    assign(this.events, this.changeLang,       Event.CHANGE_LANG);
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
      name: '',
      address: '',
      hours: [],
      tags: [],
      deleteEnabled: true,
      deleteAllEnabled: true,
      images: null,
      menu: null,
      currentId: null,
      lang: Language.SV,
    };
  }

  getCurrentItem() {
    return {
      name: this.state.name,
      address: this.state.address,
      hours: this.state.hours.constructor === Array
        ? this.state.hours
        : this.state.hours.replace(/\s/g,'').split(','),
      tags: this.state.tags.constructor === Array
        ? this.state.tags
        : this.state.tags.replace(/\s/g,'').split(','),
      menu: this.state.menu,
      images:
        this.state.images === undefined
          ? { gallery : '', banner : ''}
          : this.state.images,
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

  changeMenuItem([menuIndex, itemIndex, prop, lang], value) {
    console.log(lang);
    var menu = this.state.menu;
    menu[lang][menuIndex].items[itemIndex][prop] = value;
    this.setState({ menu });
  }

  changeMenuName([menuIndex, lang], value) {
    var menu = this.state.menu;
    menu[lang][menuIndex].name = value;
    this.setState({ menu });
  }

  removeMenuItem([menuIndex, itemIndex]) {
    var menu = this.state.menu;
    menu[Language.SV][menuIndex].items.splice(itemIndex, 1);
    menu[Language.EN][menuIndex].items.splice(itemIndex, 1);
    this.setState({ menu });
  }

  removeMenu([menuIndex]) {
    var menu = this.state.menu;
    menu[Language.SV].splice(menuIndex, 1);
    menu[Language.EN].splice(menuIndex, 1);
    this.setState({ menu });
  }

  newMenuItem([menuIndex]) {
    var menu = this.state.menu;
    var newItem = {
      name : '',
      desc : '',
      price : ''
    };
    menu[Language.SV][menuIndex].items.push(newItem);
    menu[Language.EN][menuIndex].items.push(newItem);
    this.setState({ menu });
  }

  newMenu() {
    var menu = this.state.menu;
    menu[Language.SV].push({
      name : '',
      items : []
    });
    menu[Language.EN].push({
      name : '',
      items : []
    });

    this.setState({ menu })
  }

  moveMenuItemUp([menuIndex, itemIndex]) {
    let menu = this.state.menu;
    let lang = [Language.SV, Language.EN];
    for (let i = 0; i < 2; ++i) {
      if (menu[lang[i]][menuIndex].items.length > 1) {
        let target = itemIndex - 1;
        if (target < 0) {
          target = menu[lang[i]][menuIndex].items.length - 1;
        }
        var temp = menu[lang[i]][menuIndex].items[target];
        menu[lang[i]][menuIndex].items[target] = menu[lang[i]][menuIndex].items[itemIndex];
        menu[lang[i]][menuIndex].items[itemIndex] = temp;
        this.setState({ menu });
      }
    }
  }

  moveMenuItemDown([menuIndex, itemIndex]) {
    var menu = this.state.menu;
    let lang = [Language.SV, Language.EN];
    for (let i = 0; i < 2; ++i) {
      if (menu[lang[i]][menuIndex].items.length > 1) {
        let target = itemIndex + 1;
        if (target >= menu[lang[i]][menuIndex].items.length) {
          target = 0;
        }
        var temp = menu[lang[i]][menuIndex].items[target];
        menu[lang[i]][menuIndex].items[target] = menu[lang[i]][menuIndex].items[itemIndex];
        menu[lang[i]][menuIndex].items[itemIndex] = temp;
        this.setState({ menu });
      }
    }
  }

  moveMenuUp([index]) {
    var menu = this.state.menu;
    let lang = [Language.SV, Language.EN];
    for (let i = 0; i < 2; ++i) {
      if (menu[lang[i]].length > 1) {
        var target = index - 1;
        if (target < 0) {
          target = menu[lang[i]].length - 1;
        }
        var temp = menu[lang[i]][target];
        menu[lang[i]][target] = menu[lang[i]][index];
        menu[lang[i]][index] = temp;
        this.setState({ menu });
      }
    }
  }

  moveMenuDown([index]) {
    var menu = this.state.menu;
    let lang = [Language.SV, Language.EN];
    for (let i = 0; i < 2; ++i) {
      if (menu[lang[i]].length > 1) {
        var target = index + 1;
        if (target >= menu[lang[i]].length) {
          target = 0;
        }
        var temp = menu[lang[i]][target];
        menu[lang[i]][target] = menu[lang[i]][index];
        menu[lang[i]][index] = temp;
        this.setState({ menu });
      }
    }
  }

  changeLang() {
    var lang = this.state.lang;
    lang = lang === Language.SV ? Language.EN : Language.SV;
    this.setState({ lang });
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
      Event.NAME_CHANGE,  Event.TAGS_CHANGE,
      Event.HOURS_CHANGE, Event.ADDRESS_CHANGE];

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
      this.changeMenuItem(args.slice(1), value);
    } else if (label === Event.CHANGE_MENU_NAME) {
      this.changeMenuName(args.slice(1), value);
    }
  }

  onChangeSearch(value) {
    value = value.toLowerCase();
    const foodPlaces = this.state.foodPlace;
    var index = _.findIndex(this.state.foodPlaces, (foodPlace) => {
      var name = foodPlace.name.toLowerCase();
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
              };
            })
          }
          deleteEnabled={this.state.deleteEnabled}
          deleteAllEnabled={this.state.deleteAllEnabled}
          _key={getConfig(Config.KEY)}
          lang={this.state.lang}
        />
        <hr />
        <Form
          singleInput={{
            name: this.state.name,
            tags: this.state.tags,
            images: this.state.images,
            address: this.state.address,
            hours: this.state.hours
          }}
          menu={this.state.menu}
          onClick={this.onClick}
          onChange={this.onChangeForm}
          lang={this.state.lang}
        />
      </div>
    );
  }
}

export default Admin;
