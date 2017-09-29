import React from 'react';
import InputText from '../util/input_text';

const SearchBarAddress = (onChange, placeholder) => {
  return (
    <li>
      <InputText
        onChange={onChange}
        placeholder={placeholder}
      />
    </li>
  );
};

export default SearchBarAddress;
