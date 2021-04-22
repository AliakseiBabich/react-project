import React from 'react';
import classNames from 'classnames';

const Button = props => {
  const btnClass = classNames(`button`, props.className);
  return (
    <button onClick={props.onClick} type={props.type} className={btnClass}>
      {props.value}
    </button>
  );
};

export default Button;
