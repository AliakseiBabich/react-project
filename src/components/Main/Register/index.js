import React, { useState } from 'react';
import Form from '../Form';
import { REGISTER_INPUTS as registerInputs } from '~/constants/constants';
import { store as notificationsStore } from 'react-notifications-component';
import { NOTIFICATION_CONFIG as notificationConfig } from '~/constants/constants';
import cloneDeep from 'lodash/cloneDeep';

const RegisterForm = () => {
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
        const user = cloneDeep(registerState);
        user.role = 'user';
        const date = new Date();
        user.registerDate = `${date.getDate()}.${
          date.getMonth() + 1
        }.${date.getFullYear()}`;
        const usersList = localStorage.getItem('users')
          ? JSON.parse(localStorage.getItem('users'))
          : [];
        usersList.push(user);
        localStorage.setItem('users', JSON.stringify(usersList));
        notificationConfig.type = 'success';
        notificationConfig.message = `пользователь ${registerState.email} успешно зарегистрирован`;
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
      inputs={registerInputs}
      className="register-form"
      state={registerState}
      buttons={registerBtn}
      onChange={handleChange}
    />
  );
};

export default RegisterForm;
