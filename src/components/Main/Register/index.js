import React, { useState } from 'react';
import Form from '../Form';
import { store as notificationsStore } from 'react-notifications-component';
import { notificationConfig } from '~/constants/constants';

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
    notificationConfig.type = 'warning';
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      notificationConfig.message =
        'Пожалуйста, заполните все поля в форме регистрации';
      notificationsStore.addNotification(notificationConfig);
    } else {
      if (password !== confirmPassword) {
        notificationConfig.message =
          'Введенные пароли не совпадают, пожалуйста, попробуйте ещё раз';
        notificationsStore.addNotification(notificationConfig);
      } else {
        localStorage.setItem(email, JSON.stringify(registerState));
        notificationConfig.type = 'success';
        notificationConfig.message = 'пользователь успешно зарегистрирован';
        notificationsStore.addNotification(notificationConfig);
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
