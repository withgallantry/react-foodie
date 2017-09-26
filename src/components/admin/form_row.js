import React from 'react';
import Label from '../util/label';
import InputText from '../util/input_text';

const FormRow = ({div, label, input}) => {
  return (
    <div
      style={div.style !== undefined ? div.style : {}}
      className={div.classes !== undefined ? div.classes : 'block'}>
      <Label
        style={label.style !== undefined ? label.style : {}}
        text={label.text}
      />
      <InputText
        style={input.style !== undefined ? input.style : {}}
        size={input.size !== undefined ? input.size : undefined}
        id={input.id}
        onChange={
          input.onChange !== undefined
            ? {
                func : input.onChange.func,
                args : input.onChange.args
              }
            : {}
        }
        value={input.value !== undefined ? input.value : ''}
        placeholder={input.placeholder !== undefined ? input.placeholder : ''}
      />
    </div>
  );
};

export default FormRow;
