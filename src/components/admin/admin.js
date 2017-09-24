import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import FoodPlaceForm from './food_place_form';
import FoodPlaceSelect from './food_place_select';

//const URL = 'https://agile-taiga-67906.herokuapp.com/';
const URL = 'http://localhost:5000/foodplace';

export const Event = Object.freeze({
  NEW  : 0,
  SAVE : 1,
  COPY : 2,
  SHOW : 3,
});

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foodPlaces: null,
      selectedIndex: null
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.loadFoodPlaces();
  }

  loadFoodPlaces() {
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

      this.setState({
        foodPlaces,
        selectedFoodPlace : null
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  showFoodPlace(id) {
    var selectedIndex = _.findIndex(this.state.foodPlaces, (foodPlace) => {
      return foodPlace._id === id;
    });
    if (selectedIndex >= 0) {
      this.setState({ selectedIndex });
    }
  }

  onClick(id, ...args) {
    console.log(`onClick[${id}](${args[0]}, ${args[1]}, ${args[2]})`);
    if (id === Event.NEW) {

    } else if (id === Event.SAVE) {

    } else if (id === Event.COPY) {

    } else if (id === Event.SHOW) {
      this.showFoodPlace(args[0]);
    }
  }

  render() {
    return (
      <div>
        <FoodPlaceSelect
          onClick={this.onClick}
          foodPlaces={this.state.foodPlaces}/>
        <FoodPlaceForm
          selectedFoodPlace={
            this.state.selectedIndex !== null
              ? this.state.foodPlaces[this.state.selectedIndex]
              : null
          }
          onClick={this.onClick}/>
      </div>
    );
  }
}

export default Admin;
