import React from 'react';

const InputText = (props) => {
    return (
      <input
        style={props.style !== undefined ? props.style : {}}
        type="text"
        size={props.size !== undefined ? props.size : '35'}
        id={props.id}
        onChange={
          props.onChange !== undefined
            ? (event) => props.onChange.func(event.target.value, props.onChange.args)
            : void(0)}
        value={props.value !== undefined ? props.value : ''}
        placeholder={props.placeholder !== undefined ? props.placeholder : ''}>
      </input>
    );
};

export default InputText;
