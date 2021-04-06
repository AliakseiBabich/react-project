import React, { useState } from 'react';
import Button from '../Button/Button.component';
import Input from '../Input/Input.component';
import classNames from 'classnames';

const Form = props => {
  const formClass = classNames(`form-container`, props.className);

  const [state, setState] = useState(props.state);

  const handleChange = e => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const inputs = props.inputs
    ? props.inputs.map(input => {
        const inputItem = (
          <Input
            {...input}
            key={input.id}
            value={input.state ? input.state[input.id] : state[input.id]}
            onChange={handleChange}
            className={input.className}
          />
        );
        if (props.header === 'Параметры опроса') {
          return (
            <tr key={input.id ? input.id : null} className="paramsInputs">
              <td>
                {inputItem}
                <label htmlFor={input.id}>{input.name}</label>
              </td>
            </tr>
          );
        }
        return inputItem;
      })
    : null;

  const buttons = props.buttons
    ? props.buttons.map(btn => {
        return <Button {...btn} key={btn.value ? btn.value : null} />;
      })
    : null;

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
