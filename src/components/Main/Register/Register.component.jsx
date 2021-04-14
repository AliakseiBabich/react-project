import React, { useState } from 'react';
import Form from '../Form/Form.component';

const RegisterForm = props => {
  const initRegisterState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const [registerState, setState] = useState(initRegisterState);

  const handleChange = e => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleRegister = e => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword
    } = registerState;
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      alert('Пожалуйста, заполните все поля в форме регистрации');
    } else {
      if (password !== confirmPassword) {
        alert('Введенные пароли не совпадают, пожалуйста, попробуйте ещё раз');
      } else {
        localStorage.setItem(email, JSON.stringify(registerState));
      }
    }
  };

  const registerBtn = [
    {
      value: 'Зарегистрироваться',
      type: 'submit',
      className: 'register-button',
      onClick: handleRegister
    }
  ];

  return (
    <Form
      header="Регистрация"
      inputs={props.registerInputs}
      className="register-form"
      state={registerState}
      buttons={registerBtn}
      onChange={handleChange}
    />
  );
};

export default RegisterForm;
