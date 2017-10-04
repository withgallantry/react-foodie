import React, { Component } from 'react';
import _ from 'lodash';
import FormRowSingleInput from './form_row_single_input';
import FormRowMultiInput from './form_row_multi_input';
import Button from '../html/button';
import { createButton } from './button_row';
import Event from './event';
import Language from '../../util/localization/language';

const formStyle = {
  position: 'absolute',
  top: '160px',
  left: '0px',
  right: '0px',
  bottom: '0px',
  overflowY: 'scroll'
};

const labelStyle = {
  display: 'inline-block',
  width: '140px',
  textAlign: 'right',
  marginRight: '20px'
};

const formRowStyle = {
  marginTop: '2px'
};

const newMenuBtnStyle = {
  marginLeft: '160px',
  marginBottom: '40px'
};

const dropDownStyle = {
  marginLeft: '160px',
  marginBottom: '10px',
  paddingTop: '5px'
};

const langBtnStyle = {
  marginLeft: '160px',
  marginTop: '15px'
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang : Language.SV
    };

    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  onClick() {
    var lang = this.state.lang === Language.SV
      ? Language.EN
      : Language.SV;
    this.setState({ lang });
  }

  render() {
    var rows = _.map(Object.keys(this.props.singleInput), (key) => {
      return {
        label: key,
        value: this.props.singleInput[key]
      };
    });

    // remove 'images' from rows, modify and add back.
    var imagesIndex = _.findIndex(rows, (row) => {
      return row.label === 'images';
    });
    if (imagesIndex >= 0) {
      var images = rows.splice(imagesIndex, 1)[0];
      if (images.value) {
        rows.push({ label: 'images.gallery', value: images.value.gallery });
        rows.push({ label: 'images.banner',  value: images.value.banner });
      }
    }

    // single input form rows
    var singleInputFormRows = _.map(rows, (row) => {
      return (
        <FormRowSingleInput
          key={row.label}
          div={{ style : formRowStyle }}
          label={{
            style : labelStyle,
            htmlFor : row.label,
            text : row.label
          }}
          input={{
            id : row.label,
            value : row.value,
            onChange : {
              func : this.props.onChange,
              args : [row.label]
            }
          }}
        />
      );
    });

    // multi input form rows
    var multiInputFormRows = [];
    if (this.props.menu) {
      for (var i = 0; i < this.props.menu.length; ++i) {
        var menu = this.props.menu[i];
        multiInputFormRows.push((
          <div key={`menu${i}`}>
            <hr />
            <FormRowMultiInput
              menu={menu}
              index={i}
              onChange={this.props.onChange}
              onClick={this.props.onClick}
              lang={this.state.lang}
            />
          </div>
        ));
      }
    }

    return (
      <div style={formStyle}>
        <Button
          style={langBtnStyle}
          label={this.state.lang === Language.EN
            ? (<div><b>En</b> | Sv</div>)
            : (<div>En | <b>Sv</b></div>)}
          onClick={{ func : this.onClick }}
        />
        <div style={{marginTop : '10px'}}>
          {singleInputFormRows}
          {
            _.forEach(multiInputFormRows, (row) => {
              return row;
            })
          }
        </div>
        <hr />
        {createButton('plus', this.props.onClick, Event.NEW_MENU, 0, newMenuBtnStyle)}
      </div>
    );
  }
};

export default Form;
