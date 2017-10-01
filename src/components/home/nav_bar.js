import React from 'react';
import Button from '../util/html/button';
import Language from '../util/localization/language';
import Event from './event';

const style = {
  position: 'absolute',
  top: '32px',
  right: '40px',
};

const NavBar = ({onClick, language, itemCount}) => {
  return (
    <div style={style}>
      <Button
        label={language === Language.EN
          ? (<div><b>En</b> | Sv</div>)
          : (<div>En | <b>Sv</b></div>)}
        onClick={{
          func : onClick,
          id : Event.CHANGE_LANGUAGE
        }}
      />
      <Button
        style={{ marginLeft: '5px' }}
        glyphicon={'shopping-cart'}
        label={` (${itemCount})`}
      />
    </div>
  );
};

export default NavBar;
