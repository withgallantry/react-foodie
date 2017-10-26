import React from 'react';
import PropTypes from 'prop-types';

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

InputText.propTypes = {
  dataTip: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.shape({
    func: PropTypes.func,
    args: PropTypes.array,
  }),
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputText;
