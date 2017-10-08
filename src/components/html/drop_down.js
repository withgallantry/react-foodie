import React from 'react';

const DropDown = (props) => {
  let counter = 0;
  let rows = _.map(props.rows, (row) => {
    return (
      <li onClick={() => props.onClick.func(props.onClick.id, [row.value])} key={`${row.value}${counter++}`}>
        <a href={props.href}>{row.value}</a>
      </li>
    );
  });

  return (
    <div style={props.style !== undefined ? props.style : {}} className="dropdown">
      <button
        className={props.classes !== undefined ? `${props.classes} btn dropdown-toggle` : "btn btn-default dropdown-toggle"}
        type="button"
        data-toggle="dropdown">
        {`${props.title} `}
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu scrollable-menu">
        {rows}
      </ul>
    </div>
  );
};

export default DropDown;
