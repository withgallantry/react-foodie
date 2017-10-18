import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import Gallery from './gallery/gallery';
import Header from './header';
import Store from './store/store';
import * as Cookies from '../../util/cookies';
import * as Constants from '../../util/constants';
import * as Event from './event';
import * as Language from '../../util/localization/language';
import * as Settings from '../../util/settings';

const COOKIE_LATEST  = 'latest';
const COOKIE_ADDRESS = 'address';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      addressSearch : undefined,
      storeSearch : '',
      language : Settings.get(Settings.LANGUAGE),
      storeId : undefined,
    };

    this.onClick = this.onClick.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onOrderChange = this.onOrderChange.bind(this);
  }

  componentDidMount() {
    const storeId = Cookies.get(COOKIE_LATEST);
    if (storeId) {
      this.setState({ storeId });
    }

    // if couldnt find address cookie:
    const addressSearch = Cookies.get(COOKIE_ADDRESS);
    if (addressSearch) {
      this.setState({ addressSearch });
    } else {
      this.setState({ addressSearch : Constants.DEFAULT_ADDRESS });
    }
  }

  changeLanguage() {
    let language = this.state.language;
    if (language === Language.SV) {
      language = Language.EN;
    } else {
      language = Language.SV;
    }
    Settings.set(Settings.LANGUAGE, language);
    this.setState({ language });
  }

  onAddressChange(addressSearch) {
    Cookies.set(COOKIE_ADDRESS, addressSearch);
    this.setState({ addressSearch });
  }

  // for debugging purposes
  deleteCookies() {
    Cookies.removeAll();
    window.location.reload();
  }

  onOrderChange(storeId) {
    this.setState({ storeId });
    Cookies.set(COOKIE_LATEST, storeId);
  }

  onClick(id) {
    console.log(`onClick(${id})`);
    if (id === Event.CHANGE_LANGUAGE) {
      this.changeLanguage();
    } else if (id === Event.DELETE_COOKIES) {
      this.deleteCookies();
    } else if (id === Event.PRINT_COOKIES) {
      Cookies.print();
    }
  }

  render() {
    const MyStore = (props) => {
      return (
        <Store
          {...props}
          address={this.state.addressSearch}
          language={this.state.language}
          onOrderChange={this.onOrderChange}
         />
       );
    };

    const myGallery = (props) => {
      return (
        <Gallery
          {...props}
          language={this.state.language}
         />
       );
    };

    return (
      <div>
        <Header
          onChange={this.onChange}
          onClick={this.onClick}
          onAddressChange={this.onAddressChange}
          search={this.state.addressSearch}
          language={this.state.language}
          storeId={this.state.storeId}
        />
        <hr className='hr-home'/>
        <Switch>
          <Route exact path='/store/:id' render={(props) => MyStore(props)} />
          <Route exact path='/gallery' render={(props) => myGallery(props)} />
          <Redirect from='/' to='gallery'/>
        </Switch>
      </div>
    );
  }
}

export default Home;
