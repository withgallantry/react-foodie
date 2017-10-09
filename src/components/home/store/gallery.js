import React, { Component } from 'react';
import NavBar from './nav_bar';
import GalleryItem from './gallery_item';
import { localize } from '../../../util/localization/strings';
import axios from 'axios';
import _ from 'lodash';
import { URL } from '../../../util/constants';
import Config, { getConfig } from '../../../util/config';
import Language from '../../../util/localization/language';

export const Event = {
  FILTER : 0,
  SEARCH : 1
};

const divStyle = {
  position: 'absolute',
  top: '70px',
  left: '0px',
  right: '0px',
  bottom: '0px',
  overflowY: 'scroll'
};

const galleryStyle = {
  width: '89%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '15px',
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
    axios.get(`${URL}/${getConfig(Config.KEY)}`).then((response) => {
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

  onClick(id) {
    console.log(`Gallery.onClick(${id})`);

    if (id === Event.SEARCH) {
      this.setState({ searchExpanded : true });
    }
  }

  onChange(id, value) {

  }

  createStores() {
    var stores = this.state.stores;
    _.forEach(stores, (store) => {
      store.isOpen = this.storeIsOpen(store.hours);
    });
    stores = _.orderBy(stores, ['isOpen'], ['desc']);
    stores = _.map(stores, (store) => {
      return (
        <GalleryItem
          key={store._id}
          name={store.name}
          hours={store.hours}
          tags={localize(store.tags, Language.SV)}
          images={store.images}
          isOpen={store.isOpen}
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
    var date = new Date();

    let opensAtDate = new Date(date);
    opensAtDate.setHours(parseInt(opensAtHours));
    opensAtDate.setMinutes(parseInt(opensAtMinutes));

    let closesAtDate = new Date(date);
    closesAtDate.setHours(parseInt(closesAtHours));
    closesAtDate.setMinutes(parseInt(closesAtMinutes));
    if (closesAtDate.getHours() < opensAtDate.getHours()) {
      closesAtDate.setDate(closesAtDate.getDate() + 1);
    }

    return date > opensAtDate && date < closesAtDate;
  };

  render() {
    if (this.state.loading) {
      // TODO : loading gif
      return (<div></div>);
    }

    var stores = this.createStores();

    return (
      <div style={divStyle}>
        <NavBar
          onClick={this.onClick}
          onChange={this.onChange}
          searchExpanded={this.state.searchExpanded}
        />
        <div style={galleryStyle}>
          {stores}
        </div>
      </div>
    );
  }
}

export default Gallery;
