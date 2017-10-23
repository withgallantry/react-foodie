import React, { Component } from 'react';
import _ from 'lodash';

import GalleryItem from './gallery_item';
import LoadingBar from '../../shared/loading_bar';
import SearchBar from './search_bar';
import * as Constants from '../../../misc/constants';
import * as Debug from '../../../misc/debug';
import * as Db from '../../../misc/db';
import * as Key from '../../../misc/key';
import * as Language from '../../../misc/localization/language';
import * as Settings from '../../../misc/settings';
import * as Strings from '../../../misc/localization/strings';
import * as Util from '../../../misc/util';

const DIV_STYLE = {
  position: 'absolute',
  top: Constants.HOME_HEADER_HEIGHT,
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

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading : true,
      stores : [],
      filter : [],
      language : props.language,
    };

    this.onSearch = this.onSearch.bind(this);
    this.onSearchDebounced = _.debounce(this.onSearch, 300);
  }

  componentDidMount() {
    Key.update(() => {
      this.load();
    });
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

  onSearch(value) {
    // convert string to array of words
    const words = Util
      .replaceAll(value, ',', ' ')
      .toLowerCase()
      .split(' ')
      .filter((e) => e); // removes empty values

    const stores = this.state.stores;
    // look for names & tags
    let result = _.filter(stores, (store) => {
      const names = store.name.toLowerCase().split(' ');
      for (let word of words) {
        for (let name of names) {
          if (name.includes(word)) {
            return true;
          }
        }
        for (let tag of store.tags) {
          if (tag.toLowerCase().includes(word)) {
            return true;
          }
        }
      }
      return false;
    });

    if (result.length > 0) {
      let ids = [];
      let names = [];
      for (let r of result) {
        ids.push(r._id);
        names.push(r.name);
      }
      Debug.log(names);
      this.setState({ filter : ids });
    } else {
      this.setState({ filter : [] });
    }
  }

  createStores() {
    let stores = this.state.stores;
    let filter = this.state.filter;
    _.forEach(stores, (store) => {
      store.isOpen = this.storeIsOpen(store.hours);
    });
    stores = _.orderBy(stores, ['isOpen'], ['desc']);
    stores = _.filter(stores, (store) => {
      let match = filter.length <= 0;
      for (let id of filter) {
        if (id === store._id) {
          match = true;
        }
      }
      return match;
    });
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
        />
      );
    });

    return _.orderBy(stores, ['isOpen'], ['asc']);
  }

  storeIsOpen({ opensAt, closesAt }) {
    if (Settings.get(Settings.DEBUG) === true) {
      return true;
    }

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
      return (<LoadingBar />);
    }

    let stores = this.createStores();
    return (
      <div style={DIV_STYLE}>
        <SearchBar onSearch={this.onSearchDebounced}/>
        <div style={GALLERY_STYLE}>
          {stores}
        </div>
      </div>
    );
  }
}

export default Gallery;
