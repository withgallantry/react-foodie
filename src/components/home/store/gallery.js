import React, { Component } from 'react';
import NavBar from './nav_bar';
import GalleryItem from './gallery_item';
import { getLanguage } from '../../../util/localization/language';
import axios from 'axios';
import _ from 'lodash';

export const Event = {
  FILTER : 0,
  SEARCH : 1
};

const URL = 'http://localhost:5000/foodplace';

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
    axios.get(URL).then((response) => {
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
    const lang = getLanguage()
    stores = _.filter(stores, (store) => {
      return store.lang === lang;
    });
    return _.map(stores, (store) => {
      return (
        <GalleryItem
          key={store._id}
          name={store.name}
          hours={store.hours}
          tags={store.tags}
          images={store.images}
        />
      );
    });
  }

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
