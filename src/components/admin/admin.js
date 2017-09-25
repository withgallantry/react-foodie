import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import FoodPlaceForm from './form';
import FoodPlaceSelect from './select';

//const URL = 'https://agile-taiga-67906.herokuapp.com/';
const URL = 'http://localhost:5000/foodplace';

export const Event = Object.freeze({
  NEW                   : 0,
  SAVE                  : 1,
  COPY                  : 2,
  SHOW                  : 3,
  LANG_CHANGE           : 4,
  NAME_CHANGE           : 5,
  TAGS_CHANGE           : 6,
  HOURS_CHANGE          : 7,
  ADDRESS_CHANGE        : 8,
  MENU_CHANGE_ITEM      : 9,
  DELETE                : 10,
  SEARCH                : 11,
  ADD_TEMPLATE          : 12,
  IMAGES_GALLERY_CHANGE : 13,
  IMAGES_BANNER_CHANGE  : 14
});

const eventLut = [];
eventLut['lang']            = Event.LANG_CHANGE;
eventLut['name']            = Event.NAME_CHANGE;
eventLut['address']         = Event.ADDRESS_CHANGE;
eventLut['hours']           = Event.HOURS_CHANGE;
eventLut['tags']            = Event.TAGS_CHANGE;
eventLut['images.gallery']  = Event.IMAGES_GALLERY_CHANGE;
eventLut['images.banner']   = Event.IMAGES_BANNER_CHANGE;

const hrStyle = {
  marginTop: '10px'
};

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
      images: null,
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
          images: foodPlace.images,
          _id: foodPlace._id
        };
      });

      this.setState({ foodPlaces });

      // while testing
      if (foodPlaces.length > 0) {
        this.show(foodPlaces[0]._id);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  save() {
    var currentId = this.state.currentId;
    console.log(this.state.images);
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
        images: foodPlace.images,
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
      images: this.state.images,
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
    axios.post(URL, this.getTemplateItem()).then((response) => {
      console.log('added food place');
      this.load();
    }).catch((error) => {
      console.log(error);
    });
  }

  getTemplateItem() {
    return {
      lang: 'sv',
      name: 'Stockholm Pizza',
      address: 'Scheelegatan 6, 112 23 Stockholm',
      hours: ["11.00", "23.00"],
      tags: ["Pizza", "Kebab", "Sallad"],
      images: {
        gallery : 'img/gallery1.png',
        banner : 'img/banner1.png',
      },
      menu: [{
        name: 'Kyckling',
        items: [{
          name: 'Kycklingrulle',
          desc: 'Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
          price: '90 SEK'
        }, {
          name: 'Kycklingtallrik',
          desc: 'Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
          price: '90 SEK'
        }, {
          name: 'Kycklingsallad',
          desc: 'Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
          price: '90 SEK'
        }]
      }, {
        name: 'Kebab',
        items: [{
          name: 'Kebabrulle',
          desc: 'Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
          price: '90 SEK'
        }, {
          name: 'Kebabtallrik',
          desc: 'Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
          price: '90 SEK'
        }, {
          name: 'Kebabsallad',
          desc: 'Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
          price: '90 SEK'
        }]
      }],
      modified: new Date().toISOString()
    };
  }

  new() {
    this.reset();
    this.load();
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
    if (event) {
      console.log(`onChangeForm[${event}](${args[0]})`);
    } else {
      console.log(`onChangeForm[${label}](${args[0]}), (${args[1]}), (${args[2]}), (${args[3]})`);
    }

    if      (event === Event.LANG_CHANGE)   { this.setState({ [label] : args[0] }); }
    else if (event === Event.NAME_CHANGE)   { this.setState({ [label] : args[0] }); }
    else if (event === Event.TAGS_CHANGE)   { this.setState({ [label] : args[0] }); }
    else if (event === Event.HOURS_CHANGE)  { this.setState({ [label] : args[0] }); }
    else if (event === Event.ADRESS_CHANGE) { this.setState({ [label] : args[0] }); }
    else if (event === Event.IMAGES_GALLERY_CHANGE) {
      var images = this.state.images;
      images.gallery = args[0];
      this.setState({ images });
    }
    else if (event === Event.IMAGES_BANNER_CHANGE) {
      var images = this.state.images;
      images.banner = args[0];
      this.setState({ images });
    }
    else if (label === Event.MENU_CHANGE_ITEM) {
      this.changeMenuItem(args[0], args[1], args[2], args[3]);
    } else if (label === Event.MENU_CHANGE_NAME) {
      this.changeMenuName(args[0], args[1]);
    }
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
        <hr style={hrStyle}/>
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
