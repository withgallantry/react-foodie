import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Form from './form';
import Menu from './menu';
import { removeWhiteSpace, getTemplateItems, cloneDeep } from '../../util/util';
import Event, { propToEvent } from './event';
import { STORES_URL } from '../../util/constants';
import Config, { getConfig, setConfig } from '../../util/config';
import Language from '../../util/localization/language';
import Modals from './modals';
import { validateModel } from '../../util/model_validator';
import Models from '../../util/models';

class Admin extends Component {
  constructor() {
    super();

    this.state = this.getDefaultState();

    this.onClick          = this.onClick.bind(this);
    this.onChangeForm     = this.onChangeForm.bind(this);
    this.onChangeSearch   = this.onChangeSearch.bind(this);
    this.onChangeKey      = this.onChangeKey.bind(this);
    this.onAddressChange  = this.onAddressChange.bind(this);

    this.onChangeKeyDebounced    = _.debounce(this.onChangeKey,    300);
    this.onChangeSearchDebounced = _.debounce(this.onChangeSearch, 300);

    this.events = [];
    const assign = (array, func, id) => {
      func = func.bind(this);
      array[id] = func;
    }

    // assign functors for events
    assign(this.events, this.new,                   Event.NEW);
    assign(this.events, this.save,                  Event.SAVE);
    assign(this.events, this.copy,                  Event.COPY);
    assign(this.events, this.show,                  Event.SHOW);
    assign(this.events, this.delete,                Event.DELETE);
    assign(this.events, this.addTemplate,           Event.ADD_TEMPLATE);
    assign(this.events, this.removeMenuItem,        Event.REMOVE_MENU_ITEM);
    assign(this.events, this.removeMenu,            Event.REMOVE_MENU);
    assign(this.events, this.newMenuItem,           Event.NEW_MENU_ITEM);
    assign(this.events, this.newMenu,               Event.NEW_MENU);
    assign(this.events, this.moveMenuItemUp,        Event.MOVE_MENU_ITEM_UP);
    assign(this.events, this.moveMenuItemDown,      Event.MOVE_MENU_ITEM_DOWN);
    assign(this.events, this.moveMenuUp,            Event.MOVE_MENU_UP);
    assign(this.events, this.moveMenuDown,          Event.MOVE_MENU_DOWN);
    assign(this.events, this.deleteAll,             Event.DELETE_ALL);
    assign(this.events, this.changeLang,            Event.CHANGE_LANG);
    assign(this.events, this.clone,                 Event.CLONE);
    assign(this.events, this.hoursOpensChange,      Event.HOURS_OPENS_CHANGE);
    assign(this.events, this.hoursClosesChange,     Event.HOURS_CLOSES_CHANGE);
    assign(this.events, this.minutesOpensChange,    Event.MINUTES_OPENS_CHANGE);
    assign(this.events, this.minutesClosesChange,   Event.MINUTES_CLOSES_CHANGE);
    assign(this.events, this.setImageGallery,       Event.SET_IMAGE_GALLERY);
    assign(this.events, this.setImageBanner,        Event.SET_IMAGE_BANNER);
  }

  componentDidMount() {
    this.load((stores) => {
      if (stores.length > 0) {
        this.show(stores[0]._id);
      }
    });
  }

  clearForm() {
    const state = this.getDefaultState();
    state.stores = this.state.stores;
    this.setState(state);
  }

  getDefaultState() {
    return {
      stores: [],
      name: 'New',
      address: '',
      hours: {
        opensAt:  { hours: '10', minutes: '00' },
        closesAt: { hours: '21', minutes: '00' }
      },
      tags: [],
      deleteEnabled: true,
      deleteAllEnabled: true,
      images: { gallery: 'gallery0.png', banner: 'banner0.png' },
      menu: null,
      currentId: null,
      lang: Language.SV,
    };
  }

  getCurrentItem() {
    return {
      name: this.state.name,
      address: this.state.address,
      hours: this.state.hours,
      // always store tags as an array of strings
      tags: this.state.tags.constructor === Array
        ? this.state.tags
        : removeWhiteSpace(this.state.tags).split(','),
      menu: this.state.menu,
      images: this.state.images,
      modified: new Date().toISOString()
    };
  }

  getUrl(id) {
    if (id !== undefined) {
      return `${STORES_URL}/${getConfig(Config.KEY)}/${id}`;
    }
    return `${STORES_URL}/${getConfig(Config.KEY)}`;
  }

  load(onFinished) {
    axios.get(this.getUrl()).then((response) => {
      const stores = response.data;
      this.validateStores(stores);
      this.setState({ stores });
      if (onFinished) {
        onFinished(stores);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  validateStores(stores) {
    // remove extra props
    for (const store of stores) {
      delete store.__v;
    }
    _.remove(stores, (store) => {
      const isValid = validateModel(store, Models.STORE);
      if (isValid === false) {
        console.log(`removed invalid store with id: ${store._id}`);
      }
      return !isValid;
    });
  }

  save() {
    const currentId = this.state.currentId;
    if (currentId !== null) {
      console.log("saving...");
      console.log(this.getCurrentItem());
      axios.put(`${STORES_URL}/${currentId}`, this.getCurrentItem()).then((response) => {
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
    let id = args;
    if (args.constructor === Array) {
      id = args[0];
    }
    const store = _.find(this.state.stores, (store) => {
      return store._id === id;
    });
    if (store) {
      this.setState({
        name: store.name,
        address: store.address,
        hours: store.hours,
        tags: store.tags,
        images: store.images,
        menu: store.menu,
        currentId: id
      });
    }
  }

  copy() {
    const item = this.getCurrentItem();
    item.name = `${item.name} (copy)`;
    axios.post(this.getUrl(), item).then((response) => {
      console.log('added food place');
      this.load((stores) => {
        const match = _.find(stores, (obj) => {
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
    const index = _.findIndex(this.state.stores, (obj) => {
      return obj._id === currentId;
    });
    if (currentId) {
      this.setState({ deleteEnabled : false });
      axios.delete(`${STORES_URL}/${currentId}`).then((response) => {
        console.log(`deleted food place with id ${currentId}`);
        this.load((stores) => {
          this.setState({ deleteEnabled : true });
          if (stores.length > 0) {
            if (index >= 1) {
              this.show(stores[index - 1]._id);
            } else {
              this.show(stores[0]._id);
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
    if (this.state.stores.length > 0) {
      this.setState({ deleteAllEnabled : false });
      axios.delete(`${this.getUrl()}/deleteAll`).then((response) => {
        this.clearForm();
        this.setState({ stores : [] });
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  addTemplate() {
    axios.post(this.getUrl(), getTemplateItems()).then((response) => {
      console.log('added food place');
      this.load((stores) => {
        const match = _.find(stores, (obj) => {
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
    // TODO : for some reason I need to clone this deeply, otherwise
    // some weird reference error appears, look into it when u got time.
    // both language versions will get the changes if i dont clone, strangely.
    const menu = cloneDeep(this.state.menu);
    menu[lang][menuIndex].items[itemIndex][prop] = value;
    this.setState({ menu });
  }

  changeMenuName([menuIndex, lang], value) {
    const menu = this.state.menu;
    menu[lang][menuIndex].name = value;
    this.setState({ menu });
  }

  removeMenuItem([menuIndex, itemIndex]) {
    const menu = this.state.menu;
    menu[Language.SV][menuIndex].items.splice(itemIndex, 1);
    menu[Language.EN][menuIndex].items.splice(itemIndex, 1);
    this.setState({ menu });
  }

  removeMenu([menuIndex]) {
    const menu = this.state.menu;
    menu[Language.SV].splice(menuIndex, 1);
    menu[Language.EN].splice(menuIndex, 1);
    this.setState({ menu });
  }

  newMenuItem([menuIndex]) {
    const menu = this.state.menu;
    menu[Language.SV][menuIndex].items.push({ name : '', desc : '', price : '' });
    menu[Language.EN][menuIndex].items.push({ name : '', desc : '', price : '' });
    this.setState({ menu });
  }

  newMenu() {
    const menu = this.state.menu;
    menu[Language.SV].push({ name : '', items : [] });
    menu[Language.EN].push({ name : '', items : [] });
    this.setState({ menu })
  }

  moveMenuItem(menuIndex, itemIndex, dir) {
    const menu = this.state.menu;
    const lang = [Language.SV, Language.EN];
    for (let i = 0; i < 2; ++i) {
      let target = itemIndex + dir;
      const condition = dir === 1
        ? target >= menu[lang[i]][menuIndex].items.length
        : target < 0;
      if (condition === true) {
        target = dir === 1
          ? 0
          : target = menu[lang[i]][menuIndex].items.length - 1;
      }
      const temp = menu[lang[i]][menuIndex].items[target];
      menu[lang[i]][menuIndex].items[target] = menu[lang[i]][menuIndex].items[itemIndex];
      menu[lang[i]][menuIndex].items[itemIndex] = temp;
      this.setState({ menu });
    }
  }

  moveMenu(index, dir) {
    const menu = this.state.menu;
    const lang = [Language.SV, Language.EN];
    for (let i = 0; i < 2; ++i) {
      if (menu[lang[i]].length > 1) {
        let target = index + dir;
        const condition = dir === 1
          ? target >= menu[lang[i]].length
          : target < 0;
        if (condition === true) {
          target = dir === 1
            ? 0
            : target = menu[lang[i]].length - 1;
        }
        const temp = menu[lang[i]][target];
        menu[lang[i]][target] = menu[lang[i]][index];
        menu[lang[i]][index] = temp;
        this.setState({ menu });
      }
    }
  }

  moveMenuItemUp([menuIndex, itemIndex]) {
    this.moveMenuItem(menuIndex, itemIndex, -1);
  }

  moveMenuItemDown([menuIndex, itemIndex]) {
    this.moveMenuItem(menuIndex, itemIndex, 1);
  }

  moveMenuUp([index]) {
    this.moveMenu(index, -1);
  }

  moveMenuDown([index]) {
    this.moveMenu(index, 1);
  }

  changeLang() {
    let lang = this.state.lang;
    lang = lang === Language.SV ? Language.EN : Language.SV;
    this.setState({ lang });
  }

  clone([menuIndex, itemIndex]) {
    const currentLang = this.state.lang;
    const fetchLang = currentLang === Language.SV ? Language.EN : Language.SV;
    const menu = cloneDeep(this.state.menu);
    if (itemIndex !== undefined) {
      menu[currentLang][menuIndex].items[itemIndex]
        = menu[fetchLang][menuIndex].items[itemIndex];
    } else {
      menu[currentLang][menuIndex].name = menu[fetchLang][menuIndex].name;
    }
    this.setState({ menu });
  }

  hoursOpensChange(arg) {
    const hours = this.state.hours;
    hours.opensAt.hours = arg;
    this.setState({ hours });
  }

  hoursClosesChange(arg) {
    const hours = this.state.hours;
    hours.closesAt.hours = arg;
    this.setState({ hours });
  }

  minutesOpensChange(arg) {
    const hours = this.state.hours;
    hours.opensAt.minutes = arg;
    this.setState({ hours });
  }

  minutesClosesChange(arg) {
    const hours = this.state.hours;
    hours.closesAt.minutes = arg;
    this.setState({ hours });
  }

  setImageGallery(path) {
    const image = this.state.images;
    image.gallery = path;
    this.setState({ image });
  }

  setImageBanner(path) {
    const image = this.state.images;
    image.banner = path;
    this.setState({ image });
  }

  onAddressChange(address) {
    this.setState({ address });
  }

  onClick(id, args) {
    if (args) {
      console.log(`onClick[${id}](${args[0]}, ${args[1]}, ${args[2]})`);
    } else {
      console.log(`onClick[${id}](undefined)`);
    }
    this.events[id](args);
  }

  onChangeForm(value, [label, ...args]) {
    let event = propToEvent(label);
    console.log(`onChangeForm(${value}, ${args})[event=${event}]`);

    // events where only prop and value is needed
    const events = [Event.NAME_CHANGE, Event.TAGS_CHANGE, Event.ADDRESS_CHANGE];

    if (events.includes(event)) {
      this.setState({ [label] : value })
    }
    else if (event === Event.IMAGES_GALLERY_CHANGE) {
      const images = this.state.images;
      images.gallery = value;
      this.setState({ images });
    }
    else if (event === Event.IMAGES_BANNER_CHANGE) {
      const images = this.state.images;
      images.banner = value;
      this.setState({ images });
    }
    else if (label === Event.CHANGE_MENU_ITEM) {
      this.changeMenuItem(args, value);
    } else if (label === Event.CHANGE_MENU_NAME) {
      this.changeMenuName(args, value);
    }
  }

  onChangeSearch(value) {
    value = value.toLowerCase();
    const stores = this.state.stores;
    const index = _.findIndex(this.state.stores, (store) => {
      const name = store.name.toLowerCase();
      return _.includes(name, value);
    });
    if (index >= 0) {
      this.show(this.state.stores[index]._id);
    }
  }

  onChangeKey(value) {
    value = removeWhiteSpace(value);
    console.log(`onChangeKey(${value})`);
    if (value.length > 0) {
        setConfig(Config.KEY, value);
        this.clearForm();
        this.load((stores) => {
          if (stores.length > 0) {
            this.show(stores[0]._id);
          }
        });
    }
  }

  render() {
    return (
      <div>
        <Modals onClick={this.onClick}/>
        <Menu
          onClick={this.onClick}
          onChangeSearch={this.onChangeSearchDebounced}
          onChangeKey={this.onChangeKeyDebounced}
          onAddressChange={this.onAddressChange}
          stores={
            _.map(this.state.stores, (store) => {
              return {
                name: store.name,
                id:   store._id,
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
          onAddressChange={this.onAddressChange}
          lang={this.state.lang}
        />
      </div>
    );
  }
}

export default Admin;
