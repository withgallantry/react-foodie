import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Header from './header';
import Gallery from './gallery/gallery';
import Language, { setLanguage } from '../../util/localization/language';
import Event from './event';
import Strings, { getString } from '../../util/localization/strings';
import * as Config from '../../util/config';
import Store from './store/store';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      addressSearch : '',
      storeSearch : '',
      language : Language.SV,
    };

    Config.set(Config.DEBUG, false);
    setLanguage(this.state.language);
    this.onClick = this.onClick.bind(this);
  }

  changeLanguage() {
    let language = this.state.language;
    if (language === Language.SV) {
      language = Language.EN;
    } else {
      language = Language.SV;
    }
    setLanguage(language);
    this.setState({ language });
  }

  onClick(id) {
    console.log(`onClick(${id})`);
    if (id === Event.CHANGE_LANGUAGE) {
      this.changeLanguage();
    }
  }

  render() {
    return (
      <div>
        <Header
          onChange={this.onChange}
          onClick={this.onClick}
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
