import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import GalleryItem from './gallery_item';
import NavBar from './nav_bar';
import * as Constants from '../../../util/constants';
import * as Event from './event';
import * as Language from '../../../util/localization/language';
import * as Settings from '../../../util/settings';
import * as Strings from '../../../util/localization/strings';

const DIV_STYLE = {
  position: 'absolute',
  top: '70px',
  left: '0px',
  right: '0px',
  bottom: '0px',
  overflowY: 'scroll'
};

const GALLERY_STYLE = {
  width: '89%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '15px',
};

const LOADING_STYLE = {
  marginLeft: Constants.HOME_MARGIN_LEFT,
  marginTop: Constants.HOME_MARGIN_TOP,
};

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading : true,
      searchExpanded : false,
      stores : []
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  load() {
    this.setState({ loading : true });
    axios.get(`${Constants.STORES_URL}/${Settings.get(Settings.KEY)}`).then((response) => {
      const stores = _.map(response.data, (store) => {
        return {
          lang: store.lang,
          name: store.name,
          hours: store.hours,
          tags: store.tags,
          images: store.images,
          _id: store._id
        };
      });

      this.setState({ stores, loading : false });
    })
    .catch((error) => {
      this.setState({ loading : false });
      console.log(error);
    });
  }

  onClick(id, arg) {
    console.log(`Gallery.onClick(${id})`);

    if (id === Event.SEARCH) {
      this.setState({ searchExpanded : true });
    }
  }

  onChange(id, value) {

  }

  createStores(onClick) {
    let stores = this.state.stores;
    _.forEach(stores, (store) => {
      store.isOpen = this.storeIsOpen(store.hours);
    });
    stores = _.orderBy(stores, ['isOpen'], ['desc']);
    stores = _.map(stores, (store) => {
      return (
        <GalleryItem
          key={store._id}
          id={store._id}
          name={store.name}
          hours={store.hours}
          tags={Strings.localize(store.tags, Language.SV)}
          images={store.images}
          isOpen={store.isOpen}
          onClick={this.onClick}
        />
      );
    });

    return _.orderBy(stores, ['isOpen'], ['asc']);
  }

  storeIsOpen({ opensAt, closesAt }) {
    let opensAtMinutes = opensAt.minutes;
    let opensAtHours = opensAt.hours;
    let closesAtMinutes = closesAt.minutes;
    let closesAtHours = closesAt.hours;
    let date = new Date();

    let opensAtDate = new Date(date);
    opensAtDate.setHours(parseInt(opensAtHours));
    opensAtDate.setMinutes(parseInt(opensAtMinutes));

    let closesAtDate = new Date(date);
    closesAtDate.setHours(parseInt(closesAtHours));
    closesAtDate.setMinutes(parseInt(closesAtMinutes));
    if (closesAtDate.getHours() < opensAtDate.getHours()) {
      opensAtDate.setDate(opensAtDate.getDate() - 1);
    }

    return (date > opensAtDate && date < closesAtDate)
      || (closesAtDate < opensAtDate && date );
  };

  render() {
    if (this.state.loading) {
      // TODO : loading gif
      return (<div style={LOADING_STYLE}>Loading...</div>);
    }

    let stores = this.createStores(this.props.onClick);

    return (
      <div style={DIV_STYLE}>
        <NavBar
          onClick={this.onClick}
          onChange={this.onChange}
          searchExpanded={this.state.searchExpanded}
        />
        <div style={GALLERY_STYLE}>
          {stores}
        </div>
      </div>
    );
  }
}

export default Gallery;
