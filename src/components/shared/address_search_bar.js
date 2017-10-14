import React, { Component } from 'react';
import InputText from './html/input_text';
import * as Strings from '../../util/localization/strings';
import _ from 'lodash';
import axios from 'axios';

const SEARCH_BAR_ID = 'searchBarMaps';

/*
 * Search addresses using the Google Places API
 */
class AddressSearchBar extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(props) {
    this.setState({ props });
  }

  componentDidMount() {
    this.initializeMaps();
  }

  initializeMaps() {
    this.map = new google.maps.Map(document.getElementById('map'));
    let input = document.getElementById(SEARCH_BAR_ID);
    const options = {
      types: ['address'],
      componentRestrictions: { country: 'se' }
    };

    this.autocomplete = new google.maps.places.Autocomplete(input, options);
    google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
      let address = this.placeToAddress(this.autocomplete.getPlace());
      if (this.props.onAddressChange !== undefined) {
        this.props.onAddressChange(address);
      }
      document.getElementById(SEARCH_BAR_ID).value = address;
    });
  }

  placeToAddress(place) {
    let code, route, number, city;
    for (let i = 0; i < place.address_components.length; ++i) {
      for (let j = 0; j < place.address_components[i].types.length; ++j) {
        const type = place.address_components[i].types[j];
        const name = place.address_components[i].long_name;
        if      (type === 'postal_code')   { code   = name; }
        else if (type === 'postal_town')   { city   = name; }
        else if (type === 'street_number') { number = name; }
        else if (type === 'route')         { route  = name; }
      }
    }

    number = number !== undefined ? ` ${number}` : '';
    code = code !== undefined ? `${code}, ` : '';
    return `${route}${number}, ${code}${city}`;
  }

  render() {
    return (
      <InputText
        style={this.props.style !== undefined ? this.props.style : {}}
        id={SEARCH_BAR_ID}
        placeholder={
          this.props.placeholder !== undefined
            ? this.props.placeholder
            : Strings.get(Strings.SEARCH_ADDRESS)
        }
      />
    );
  }
}

export default AddressSearchBar;
