import React, { Component } from 'react';
import NavBar from './nav_bar';

export const Event = {
  FILTER : 0,
  SEARCH : 1
};

const style = {
  position: 'absolute',
  top: '70px',
  left: '0px',
  right: '0px',
  bottom: '0px',
  overflowY: 'scroll'
};

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchExpanded : false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(id) {
    console.log(`Gallery.onClick(${id})`);

    if (id === Event.SEARCH) {
      this.setState({ searchExpanded : true });
    }
  }

  onChange(id, value) {

  }

  render() {
    if (this.props.loading) {
      return (<div>Loading...</div>);
    }

    return (
      <div style={style}>
        <NavBar
          onClick={this.onClick}
          onChange={this.onChange}
          searchExpanded={this.state.searchExpanded}
        />
      </div>
    );
  }
}

export default Gallery;
