import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../Form';
import { LOGIN_INPUTS as loginInputs } from '~/constants/constants';
import { store as notificationsStore } from 'react-notifications-component';
import { NOTIFICATION_CONFIG as notificationConfig } from '~/constants/constants';

const Login = props => {
  const initLoginstate = {
    email: '',
    password: ''
  };

  const [loginState, setState] = useState(initLoginstate);

  const handleChange = e => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleLogin = e => {
    e.preventDefault();
    const { email, password } = loginState;
    notificationConfig.type = 'warning';
    if (!email || !password) {
      notificationConfig.message = 'Пожалуйста, заполните все поля в форме';
      notificationsStore.addNotification(notificationConfig);
    } else {
      const user = localStorage.getItem(email);
      if (user) {
        if (JSON.parse(user).password === password) {
          const auth = { isAuthenticated: true };
          props.handleAuth(auth);
          localStorage.setItem('auth', JSON.stringify(auth));
          notificationConfig.type = 'success';
          notificationConfig.message = 'Вы успешно вошли в систему';
          notificationsStore.addNotification(notificationConfig);
        } else {
          notificationConfig.message =
            'Введен неправильный пароль, пожалуйста, попробуйте снова';
          notificationsStore.addNotification(notificationConfig);
        }
      } else {
        notificationConfig.message =
          'Пользователя с таким email не существует, пожалуйста зарегистрируйтесь';
        notificationsStore.addNotification(notificationConfig);
      }
    }
  };

  const loginBtn = [
    {
      value: 'Войти',
      type: 'submit',
      className: 'login-button',
      onClick: handleLogin
    }
  ];

  return (
    <Form
      header="Вход"
      inputs={loginInputs}
      className="login-form"
      state={loginState}
      buttons={loginBtn}
      onChange={handleChange}
    >
      <div className="login-wrapper">
        <NavLink to="/register" className="navlink">
          Регистрация
        </NavLink>
        <NavLink to="/remind_pass" className="navlink">
          Забыли пароль?
        </NavLink>
      </div>
    </Form>
  );
};

export default Login;
