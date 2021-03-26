import React from 'react';

const Button = props => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={props.className ? `button ${props.className}` : `button`}
    >
      {props.value}
    </button>
  );
};

export default Button;
