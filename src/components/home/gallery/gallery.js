import React, { Component } from 'react';
import _ from 'lodash';

import GalleryItem from './gallery_item';
import NavBar from './nav_bar';
import * as Constants from '../../../misc/constants';
import * as Debug from '../../../misc/debug';
import * as Db from '../../../misc/db';
import * as Event from './event';
import * as Language from '../../../misc/localization/language';
import * as Settings from '../../../misc/settings';
import * as Strings from '../../../misc/localization/strings';

const DIV_STYLE = {
  position: 'absolute',
  top: '70px',
  left: '0px',
  right: '0px',
  bottom: '0px',
  overflowY: 'scroll'
};

const GALLERY_STYLE = {
  width: Constants.HOME_GALLERY_WIDTH,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '15px',
};

const LOADING_STYLE = {
  marginLeft: Constants.HOME_GALLERY_MARGIN_LEFT,
  marginTop: Constants.HOME_GALLERY_MARGIN_TOP,
};

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading : true,
      searchExpanded : false,
      stores : [],
      language : props.language,
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  componentWillReceiveProps({ language }) {
    this.setState({ language });
  }

  load() {
    this.setState({ loading : true });
    Db.getAll().then((response) => {
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
      console.error(error);
    });
  }

  onClick(id, arg) {
    Debug.log(`Gallery.onClick(${id})`);
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
          tags={Strings.localize(store.tags, Language.SV, this.state.language)}
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
      if (date < opensAtDate) {
        opensAtDate.setDate(opensAtDate.getDate() - 1);
      } else {
        closesAtDate.setDate(closesAtDate.getDate() + 1);
      }
    }

    return date > opensAtDate && date < closesAtDate;
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
