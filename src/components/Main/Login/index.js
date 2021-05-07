import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../Form';
import { LOGIN_INPUTS as loginInputs } from '~/constants/constants';
import { showNotification } from '~/helpers';

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
    if (!email || !password) {
      showNotification({
        type: 'warning',
        message: 'Пожалуйста, заполните все поля в форме'
      });
    } else {
      const users = JSON.parse(localStorage.getItem('users'));
      if (!users) {
        showNotification({
          type: 'warning',
          message:
            'Пользователя с таким email не существует, пожалуйста зарегистрируйтесь'
        });
        return;
      }
      const user = users?.find(u => {
        return u.email === email ? u : false;
      });
      if (!user) {
        showNotification({
          type: 'warning',
          message:
            'Пользователя с таким email не существует, пожалуйста зарегистрируйтесь'
        });
      } else {
        if (user.password === password) {
          const auth = { isAuthenticated: true, user: user };
          props.handleAuth(auth);
          localStorage.setItem('auth', JSON.stringify(auth));
          showNotification({
            type: 'success',
            message: 'Вы успешно вошли в систему'
          });
        } else {
          showNotification({
            type: 'warning',
            message: 'Введен неправильный пароль, пожалуйста, попробуйте снова'
          });
        }
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
