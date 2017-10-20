import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import Gallery from './gallery/gallery';
import Header from './header';
import Modals from './modals';
import Store from './store/store';
import * as Cookies from '../../misc/cookies';
import * as Constants from '../../misc/constants';
import * as Debug from '../../misc/debug';
import * as Event from './event';
import * as Language from '../../misc/localization/language';
import * as Settings from '../../misc/settings';

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
    const storeId = Cookies.get(Constants.COOKIE_LATEST);
    if (storeId) {
      this.setState({ storeId });
    }

    const addressSearch = Cookies.get(Constants.COOKIE_ADDRESS);
    if (addressSearch) {
      this.setState({ addressSearch });
    } else {
      // if couldnt find address cookie, set default
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
    Cookies.set(Constants.COOKIE_ADDRESS, addressSearch);
    this.setState({ addressSearch });
  }

  onOrderChange(storeId) {
    this.setState({ storeId });
    Cookies.set(Constants.COOKIE_LATEST, storeId);
  }

  onClick(id) {
    Debug.log(`onClick(${id})`);
    if (id === Event.CHANGE_LANGUAGE) {
      this.changeLanguage();
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
        <Modals />
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
