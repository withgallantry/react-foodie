/*
  Debugging functions for logging, cookies, buttons and more.
*/
import React from 'react';

import * as Cookies from './cookies';
import * as Settings from './settings';

const debug = () =>  Settings.get(Settings.DEBUG);

export const log = (msg) => {
  if (debug()) {
    console.log(msg);
  }
};

export const logCookies = () => {
  if (debug()) {
    console.log(Cookies.getAll());
  }
};

export const deleteCookies = () => {
  if (debug()) {
    Cookies.removeAll();
    window.location.reload();
  }
}

export const createButton = (label, onClick, style, id) => {
  if (debug()) {
    return (
      <button
        className='btn btn-default'
        style={style}
        onClick={() => onClick(id)}>
        {label}
      </button>
    );
  }
};
