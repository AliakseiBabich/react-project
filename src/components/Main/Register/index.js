import React, { useState } from 'react';
import Form from '../Form';
import { REGISTER_INPUTS as registerInputs } from '~/constants/constants';
import cloneDeep from 'lodash/cloneDeep';
import { showNotification } from '~/helpers';

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
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      showNotification({
        type: 'warning',
        message: 'Пожалуйста, заполните все поля в форме регистрации'
      });
    } else {
      if (password !== confirmPassword) {
        showNotification({
          type: 'error',
          message:
            'Введенные пароли не совпадают, пожалуйста, попробуйте ещё раз'
        });
      } else {
        const user = cloneDeep(registerState);
        user.name = `${user.firstname} ${user.lastname}`;
        user.role = 'admin';
        const date = new Date();
        user.registerDate = `${date.getDate()}.${
          date.getMonth() + 1
        }.${date.getFullYear()}`;
        const usersList = localStorage.getItem('users')
          ? JSON.parse(localStorage.getItem('users'))
          : [];
        usersList.push(user);
        localStorage.setItem('users', JSON.stringify(usersList));
        showNotification({
          type: 'success',
          message: `пользователь ${registerState.email} успешно зарегистрирован`
        });
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
