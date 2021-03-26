import React, { useState } from 'react';

const Input = props => {
  return (
    <input
      type={props.type ? props.type : null}
      id={props.id ? props.id : null}
      name={props.name ? props.name : null}
      placeholder={props.placeholder ? props.placeholder : null}
      value={props.value ? props.value : null}
      onChange={props.onChange ? props.onChange : null}
    />
  );
};

export default Input;
