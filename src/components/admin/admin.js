import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import FoodPlaceForm from './food_place_form';
import FoodPlaceSelect from './food_place_select';

//const URL = 'https://agile-taiga-67906.herokuapp.com/';
const URL = 'http://localhost:5000/foodplace';

export const Event = Object.freeze({
  NEW             : 0,
  SAVE            : 1,
  COPY            : 2,
  SHOW            : 3,
  LANG_CHANGE     : 4,
  NAME_CHANGE     : 5,
  TAGS_CHANGE     : 6,
  HOURS_CHANGE    : 7,
  ADDRESS_CHANGE  : 8,
  MENU_CHANGE     : 9,
  DELETE          : 10,
  SEARCH          : 11,
  ADD_TEMPLATE    : 12
});

const eventLut = [];
eventLut['lang']    = Event.LANG_CHANGE;
eventLut['name']    = Event.NAME_CHANGE;
eventLut['address'] = Event.ADDRESS_CHANGE;
eventLut['hours']   = Event.HOURS_CHANGE;
eventLut['tags']    = Event.TAGS_CHANGE;

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
      menu: null,
      currentId: null
    };

    this.onClick = this.onClick.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeFormDebounced = _.debounce(this.onChangeForm, 300);
    this.onChangeSearchDebounced = _.debounce(this.onChangeSearch, 300);
  }

  componentDidMount() {
    this.load();
  }

  reset() {
    this.setState({
      foodPlaces: null,
      lang: '',
      name: '',
      address: '',
      hours: '',
      tags: '',
      menu: null,
      currentId: null
    });
  }

  getUrl(id) {
    return `${URL}/${id}`;
  }

  load() {
    axios.get(URL).then((response) => {
      const foodPlaces = _.map(response.data, (foodPlace) => {
        return {
          lang: foodPlace.lang,
          name: foodPlace.name,
          address: foodPlace.address,
          hours: foodPlace.hours,
          tags: foodPlace.tags,
          menu: foodPlace.menu,
          _id: foodPlace._id
        };
      });

      this.setState({ foodPlaces });
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

  show(id) {
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
        menu: foodPlace.menu,
        currentId: id
      });
    }
  }

  copy() {
    axios.post(URL, {
      lang: this.state.lang,
      name: this.state.name,
      address: this.state.address,
      hours: this.state.hours,
      tags: this.state.tags,
      menu: this.state.menu,
      modified: new Date().toISOString()
    }).then((response) => {
      console.log('added food place');
      this.load();
    }).catch((error) => {
      console.log(error);
    });
  }

  delete() {
    const currentId = this.state.currentId;
    if (currentId) {
      axios.delete(this.getUrl(currentId)).then((response) => {
        console.log(`deleted food place with id ${currentId}`);
        this.reset();
        this.load();
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  addTemplate() {
    axios.post(URL, {
      lang: 'sv',
      name: 'Stockholm Pizza',
      address: 'Scheelegatan 6, 112 23 Stockholm',
      hours: ["11.00", "23.00"],
      tags: ["Pizza", "Kebab", "Sallad"],
      menu: [{
        name: 'Kyckling',
        items: {
          name: 'Kycklingrulle',
          desc: 'Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
          price: '90 SEK'
        }
      }],
      modified: new Date().toISOString()
    }).then((response) => {
      console.log('added food place');
      this.load();
    }).catch((error) => {
      console.log(error);
    });
  }

  new() {
    this.reset();
    this.load();
  }

  onClick(id, ...args) {
    console.log(`onClick[${id}](${args[0]}, ${args[1]}, ${args[2]})`);
    if (id === Event.NEW) {
      this.new();
    } else if (id === Event.SAVE) {
      this.save();
    } else if (id === Event.COPY) {
      this.copy();
    } else if (id === Event.SHOW) {
      this.show(args[0]);
    } else if (id === Event.DELETE) {
      this.delete();
    } else if (id === Event.ADD_TEMPLATE) {
      this.addTemplate();
    }
  }

  onChangeForm(label, ...args) {
    var event = eventLut[label];
    console.log(`onChangeForm[${event}](${args[0]})`);

    if (event === Event.LANG_CHANGE)   { this.setState({ [label] : args[0] }); }
    if (event === Event.NAME_CHANGE)   { this.setState({ [label] : args[0] }); }
    if (event === Event.TAGS_CHANGE)   { this.setState({ [label] : args[0] }); }
    if (event === Event.HOURS_CHANGE)  { this.setState({ [label] : args[0] }); }
    if (event === Event.ADRESS_CHANGE) { this.setState({ [label] : args[0] }); }
  }

  onChangeSearch(value) {
    value = value.toLowerCase();
    console.log(`onChangeSearch(${value})`);
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
        />
        <FoodPlaceForm
          lang={this.state.lang}
          name={this.state.name}
          tags={this.state.tags}
          address={this.state.address}
          hours={this.state.hours}
          menu={this.state.menu}
          onClick={this.onClick}
          onChange={this.onChangeFormDebounced}
        />
      </div>
    );
  }
}

export default Admin;
