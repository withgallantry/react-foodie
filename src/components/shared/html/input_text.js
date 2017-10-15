import React from 'react';

const InputText = (props) => {
    return (
      <input
        data-tip={props.dataTip !== undefined ? props.dataTip : undefined}
        data-delay-show='500'
        style={props.style !== undefined ? props.style : {}}
        type="text"
        size={props.size !== undefined ? props.size : '35'}
        id={props.id}
        onChange={
          props.onChange !== undefined
            ? (event) => props.onChange.func(event.target.value, props.onChange.args)
            : undefined}
        value={props.value !== undefined ? props.value : undefined}
        placeholder={props.placeholder !== undefined ? props.placeholder : undefined}>
      </input>
    );
};

export default InputText;
