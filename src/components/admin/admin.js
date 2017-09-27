import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import FoodPlaceForm from './form';
import FoodPlaceSelect from './select';
import { getTemplateItem } from '../util/util';
import Event, { propToEvent } from './event';

//const URL = 'https://agile-taiga-67906.herokuapp.com/';
const URL = 'http://localhost:5000/foodplace';

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      foodPlaces: null,
      lang: '',
      name: '',
      address: '',
      hours: '',
      tags: '',
      deleteEnabled: true,
      menu: null,
      currentId: null
    };

    this.onClick = this.onClick.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeSearchDebounced = _.debounce(this.onChangeSearch, 300);

    this.events = [];
    const assign = (array, func, id) => {
      func = func.bind(this);
      array[id] = func;
    }

    // assign functors for events
    assign(this.events, this.new,             Event.NEW);
    assign(this.events, this.save,            Event.SAVE);
    assign(this.events, this.copy,            Event.COPY);
    assign(this.events, this.show,            Event.SHOW);
    assign(this.events, this.delete,          Event.DELETE);
    assign(this.events, this.addTemplate,     Event.ADD_TEMPLATE);
    assign(this.events, this.removeMenuItem,  Event.REMOVE_MENU_ITEM);
    assign(this.events, this.removeMenu,      Event.REMOVE_MENU);
    assign(this.events, this.newMenuItem,     Event.NEW_MENU_ITEM);
    assign(this.events, this.newMenu,         Event.NEW_MENU);
  }

  componentDidMount() {
    this.load((foodPlaces) => {
      if (foodPlaces.length > 0) {
        this.show(foodPlaces[0]._id);
      }
    });
  }

  clearForm() {
    this.setState({
      lang: '',
      name: '',
      address: '',
      hours: '',
      tags: '',
      deleteEnabled: true,
      images: null,
      menu: null,
      currentId: null
    });
  }

  reset() {
    this.setState({
      foodPlaces: null,
      lang: '',
      name: '',
      address: '',
      hours: '',
      tags: '',
      deleteEnabled: true,
      images: null,
      menu: null,
      currentId: null
    });
  }

  getUrl(id) {
    return `${URL}/${id}`;
  }

  load(onFinished) {
    axios.get(URL).then((response) => {
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
    var item = {
      lang: this.state.lang,
      name: this.state.name,
      address: this.state.address,
      hours: this.state.hours,
      tags: this.state.tags,
      menu: this.state.menu,
      images: this.state.images,
      modified: new Date().toISOString()
    };
    if (currentId !== null) {
      axios.put(this.getUrl(currentId), item).then((response) => {
        console.log(`updated food place with id ${currentId}`);
        this.load();
      }).catch((error) => {
        console.log(error);
      });
    } else {
      axios.post(URL, item).then((response) => {
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
    axios.post(URL, {
      lang: this.state.lang,
      name: `${this.state.name} (copy)`,
      address: this.state.address,
      hours: this.state.hours,
      tags: this.state.tags,
      images: this.state.images,
      menu: this.state.menu,
      modified: new Date().toISOString()
    }).then((response) => {
      console.log('added food place');
      this.load((foodplaces) => {
        var match = _.find(foodplaces, (obj) => {
          return obj._id === response.data._id;
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
      axios.delete(this.getUrl(currentId)).then((response) => {
        console.log(`deleted food place with id ${currentId}`);
        this.load((foodPlaces) => {
          this.setState({ deleteEnabled : true });
          if (foodPlaces.length > 0) {
            if (index >= 1) {
              this.show(foodPlaces[index - 1]._id);
            }
          } else {
            this.reset();
          }
        });
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  addTemplate() {
    axios.post(URL, getTemplateItem()).then((response) => {
      console.log('added food place');
      this.load((foodPlaces) => {
        var match = _.find(foodPlaces, (obj) => {
          return obj._id === response.data._id;
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
    console.log("blä");
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
    }

    if      (event === Event.LANG_CHANGE)   { this.setState({ [label] : value }); }
    else if (event === Event.NAME_CHANGE)   { this.setState({ [label] : value }); }
    else if (event === Event.TAGS_CHANGE)   { this.setState({ [label] : value }); }
    else if (event === Event.HOURS_CHANGE)  { this.setState({ [label] : value }); }
    else if (event === Event.ADDRESS_CHANGE) { this.setState({ [label] : value }); }
    else if (event === Event.IMAGES_GALLERY_CHANGE) {
      var images = this.state.images;
      images.gallery = value;
      this.setState({ images });
    }
    else if (event === Event.IMAGES_BANNER_CHANGE) {
      var images = this.state.images;
      images.banner = value;
      this.setState({ images });
    }
    else if (label === Event.MENU_CHANGE_ITEM) {
      console.log("pls");
      this.changeMenuItem(args[1], args[2], args[3], value);
    } else if (label === Event.MENU_CHANGE_NAME) {
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

  render() {
    return (
      <div>
        <FoodPlaceSelect
          onClick={this.onClick}
          onChange={this.onChangeSearchDebounced}
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
        />
        <hr />
        <FoodPlaceForm
          lang={this.state.lang}
          name={this.state.name}
          tags={this.state.tags}
          images={this.state.images}
          address={this.state.address}
          hours={this.state.hours}
          menu={this.state.menu}
          onClick={this.onClick}
          onChange={this.onChangeForm}
        />
      </div>
    );
  }
}

export default Admin;
