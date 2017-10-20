import React, { Component } from 'react';
import _ from 'lodash';

import * as Db from '../util/db';
import * as Settings from '../util/settings';


class Json extends Component {
  constructor() {
    super();

    this.state = {
      blob : 'loading...'
    };
  }

  componentDidMount() {
    Db.getAll().then((response) => {
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
      console.error(error);
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
