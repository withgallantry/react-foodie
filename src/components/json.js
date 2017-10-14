import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import { STORES_URL } from '../util/constants';
import * as Settings from '../util/settings';


class Json extends Component {
  constructor() {
    super();

    this.state = {
      blob : 'loading...'
    };
  }

  componentDidMount() {
    axios.get(`${STORES_URL}/${Settings.get(Settings.KEY)}`).then((response) => {
      const stores = _.map(response.data, (store) => {
        return {
          lang: store.lang,
          name: store.name,
          address: store.address,
          hours: store.hours,
          tags: store.tags,
          menu: store.menu,
          images: store.images,
          modified: store.modified,
        };
      });

      this.setState({ blob : JSON.stringify(stores) });
    }).catch((error) => {
      console.log(error);
      this.setState({ blob : 'error on load' })
    })
  }

  render() {
    return (
      <div>
        {this.state.blob}
      </div>
    );
  }
}

export default Json;
