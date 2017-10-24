import React, { Component } from 'react';
import _ from 'lodash';

import Form from './form';
import LoadingBar from '../shared/loading_bar';
import Menu from './menu';
import Modals from './modals';
import * as Constants from '../../misc/constants';
import * as Cookies from '../../misc/cookies';
import * as Debug from '../../misc/debug';
import * as Db from '../../misc/db';
import * as Event from './event';
import * as Key from '../../misc/key';
import * as Language from '../../misc/localization/language';
import * as Models from '../../misc/models/models';
import * as ModelValidator from '../../misc/models/model_validator';
import * as Settings from '../../misc/settings';
import * as Util from '../../misc/util';

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
    assign(this.events, this.setTemplate,           Event.SET_TEMPLATE);
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
    assign(this.events, this.reset,                 Event.RESET);
  }

  componentDidMount() {
    Key.update(() => {
      this.load((stores) => {
        if (stores.length > 0) {
          this.show(stores[0]._id);
        }
      });
    });
  }

  clearForm() {
    const state = this.getDefaultState();
    state.loading = false;
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
      loading: true,
    };
  }

  getCurrentItem() {
    return {
      name: this.state.name,
      address: this.state.address,
      hours: this.state.hours,
      // always store tags as an array of strings, and remove duplicates.
      tags: this.state.tags.constructor === Array
          ? [...new Set(this.state.tags)]
          : [...new Set(Util.removeWhiteSpace(this.state.tags).split(','))],
      menu: this.state.menu,
      images: this.state.images,
    };
  }

  load(onFinished) {
    this.setState({ loading : true });
    Db.getAll().then((response) => {
      const stores = response.data;
      this.validateStores(stores);
      // default sorting by name
      stores.sort((a, b) => {
        return a.name.localeCompare(b.name) > 0;
      });
      this.setState({ stores });
      if (onFinished) {
        onFinished(stores);
      }
      this.setState({ loading : false });
    })
    .catch((error) => {
      console.error(error);
      this.setState({ loading : false });
    })
  }

  validateStores(stores) {
    // remove extra props
    for (const store of stores) {
      delete store.__v;
      delete store.createdAt;
    }
    _.remove(stores, (store) => {
      const isValid = ModelValidator.validate(store, Models.STORE);
      if (isValid === false) {
        console.warn(`removed invalid store with id: ${store._id}`);
      }
      return !isValid;
    });
  }

  save() {
    const currentId = this.state.currentId;
    if (currentId !== null) {
      Debug.log('updating...');
      Debug.log(this.getCurrentItem());
      Db.update(currentId, this.getCurrentItem()).then((response) => {
        Debug.log(`updated store with id ${currentId}`);
        this.load();
      }).catch((error) => {
        console.error(error);
      });
    } else {
      Debug.log('saving...');
      Debug.log(this.getCurrentItem());
      Db.add(this.getCurrentItem()).then((response) => {
        Debug.log('added store');
        this.load(() => {
          this.show(response.data[0]._id);
        })
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  show(args) {
    const id = args.constructor === Array ? args[0] : args;
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
    Db.add(item).then((response) => {
      Debug.log('added store');
      this.load((stores) => {
        const match = _.find(stores, (obj) => {
          return obj._id === response.data[0]._id;
        });
        if (match) {
          this.show(match._id);
        }
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  delete() {
    const currentId = this.state.currentId;
    const index = _.findIndex(this.state.stores, (obj) => {
      return obj._id === currentId;
    });
    if (currentId) {
      this.setState({ deleteEnabled : false });
      Db.remove(currentId).then((response) => {
        Debug.log(`deleted store with id ${currentId}`);
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
        console.error(error);
      });
    }
  }

  deleteAll() {
    if (this.state.stores.length > 0) {
      this.setState({ deleteAllEnabled : false });
      Db.removeAll().then((response) => {
        this.clearForm();
        this.setState({ stores : [] });
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  addTemplate() {
    Db.getTemplate().then((response) => {
      Db.add(response.data).then((response) => {
        Debug.log('added template stores');
        this.load((stores) => {
          const match = _.find(stores, (obj) => {
            return obj._id === response.data[0]._id;
          });
          if (match) {
            this.show(match._id);
          }
        });
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  setTemplate() {
    const stores = this.state.stores;
    Db.setTemplate(stores).then((response) => {
      Debug.log("template stores was set");
    }).catch((error) => {
      console.error(error);
    });
  }

  reset() {
    Cookies.remove(Constants.COOKIES_KEY);
    window.location.reload();
  }

  new() {
    this.clearForm();
  }

  changeMenuItem([menuIndex, itemIndex, prop, lang], value) {
    // TODO : for some reason I need to clone this deeply, otherwise
    // some weird reference error appears, look into it when u got time.
    // both language versions will get the changes if i dont clone, strangely.
    const menu = Util.cloneDeep(this.state.menu);
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
    const menu = Util.cloneDeep(this.state.menu);
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
      Debug.log(`onClick[${id}](${args[0]}, ${args[1]}, ${args[2]})`);
    } else {
      Debug.log(`onClick[${id}](undefined)`);
    }
    this.events[id](args);
  }

  onChangeForm(value, [label, ...args]) {
    let event = Event.propToEvent(label);
    Debug.log(`onChangeForm(${value}, ${args})[event=${event}]`);

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
    value = Util.removeWhiteSpace(value);
    Debug.log(`onChangeKey(${value})`);
    if (value.length > 0) {
        Settings.set(Settings.KEY, value);
        Cookies.set(Constants.COOKIES_KEY, value);
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
          _key={Settings.get(Settings.KEY)}
          lang={this.state.lang}
        />
        <hr />
        {(() => {
          if (this.state.loading === false) {
            return (
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
            );
          } else {
            return (<LoadingBar />);
          }
        })()}
      </div>
    );
  }
}

export default Admin;
