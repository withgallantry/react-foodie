import React from 'react';
import Label from '../html/label';
import InputText from '../html/input_text';
import DropDown from '../html/drop_down';

const createDropDowns = (dropDown) => {
  let items = [];
  for (let i = 0; i < dropDown.count; ++i) {
    items.push(
      <DropDown
        key={`dropDown[${dropDown.ids[i]}]`}
        href={dropDown.href}
        onClick={{
          func : dropDown.onClick,
          id : dropDown.ids[i],
        }}
        rows={dropDown.rows[i]}
        style={dropDown.style}
        title={dropDown.selected[i]}
      />
    );
    if (i % 2 == 0) {
      items.push(
        <div
          key={`dropDown[${dropDown.ids[i][i]}]`}
          style={{ display : 'inline' }}>
          &nbsp;:&nbsp;
          </div>
      );
    }
  }

  return (
    <div style={{ display : 'inline' }}>
      {items}
    </div>
  );
};

const FormRowSingleInput = ({div, label, input, dropDown}) => {
  return (
    <div
      style={div.style !== undefined ? div.style : {}}
      className={div.classes !== undefined ? div.classes : 'block'}>
      <Label
        style={label.style !== undefined ? label.style : {}}
        text={label.text}
      />
      {dropDown === undefined
        ? <InputText
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
        : createDropDowns(dropDown)
      }
    </div>
  );
};

export default FormRowSingleInput;
