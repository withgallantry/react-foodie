import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import Gallery from './gallery/gallery';
import Header from './header';
import Store from './store/store';
import * as Cookies from '../../util/cookies';
import * as Event from './event';
import * as Language from '../../util/localization/language';
import * as Settings from '../../util/settings';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      addressSearch : undefined,
      storeSearch : '',
      language : Settings.get(Settings.LANGUAGE),
    };

    this.onClick = this.onClick.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
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
    this.setState({ addressSearch });
  }

  onClick(id) {
    console.log(`onClick(${id})`);
    if (id === Event.CHANGE_LANGUAGE) {
      this.changeLanguage();
    } else if (id === Event.DELETE_COOKIES) {
      Cookies.removeAll();
    } else if (id === Event.PRINT_COOKIES) {
      Cookies.print();
    }
  }

  render() {
    return (
      <div>
        <Header
          onChange={this.onChange}
          onClick={this.onClick}
          onAddressChange={this.onAddressChange}
          search={this.state.addressSearch}
          language={this.state.language}
          itemCount={2} // temp
        />
        <hr className='hr-home'/>
        <Switch>
          <Route exact path='/store/:id' component={Store} />
          <Route exact path='/gallery' component={Gallery} />
          <Redirect from='/' to='gallery'/>
        </Switch>
      </div>
    );
  }
}

export default Home;
