import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import classNames from 'classnames';

const Form = props => {
  const formClass = classNames(`form-container`, props.className);

  const inputs = props.inputs?.map(input => {
    const inputItem = (
      <Input
        {...input}
        key={input.id}
        value={input.state ? input.state[input.id] : props.state[input.id]}
        onChange={props.onChange}
        className={input.className}
      />
    );
    if (props.header === 'Параметры опроса') {
      return (
        <tr key={input.id ? input.id : null} className="paramsInputs">
          <td className="paramsInputs-item-wrapper">
            {inputItem}
            <label htmlFor={input.id}>{input.name}</label>
          </td>
        </tr>
      );
    }
    return inputItem;
  });

  const buttons = props.buttons?.map(btn => {
    return (
      <Button
        {...btn}
        key={btn.value ? btn.value : null}
        onClick={btn.onClick}
      />
    );
  });

  if (props.header === 'Параметры опроса') {
    return <tbody>{inputs}</tbody>;
  } else {
    return (
      <form className={formClass}>
        <h2 className="form-container-header">{props.header}</h2>
        {inputs}
        {props.children}
        <div className="form-container-buttons-wrapper">{buttons}</div>
      </form>
    );
  }
};

export default Form;
