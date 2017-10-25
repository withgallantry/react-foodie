import React, { Component } from 'react';
import _ from 'lodash';

import LoadingBar from './shared/loading_bar';
import * as Db from '../misc/db';
import * as Settings from '../misc/settings';

/*
  Displays Json for the current set of stores, used mainly for getting a
  backup json blob for the template store set.
*/
class Json extends Component {
  constructor() {
    super();

    this.state = {
      blob : <LoadingBar />
    };
  }

  componentDidMount() {
    Db.getAll().then((response) => {
      const stores = _.map(response.data, (store) => {
        return {
          name: store.name,
          address: store.address,
          hours: store.hours,
          tags: store.tags,
          menu: store.menu,
          images: store.images,
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
