import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../Form/Form.component';
import { cloneDeep } from 'lodash/cloneDeep';

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
      alert('Пожалуйста, заполните все поля в форме');
    } else {
      const user = localStorage.getItem(email);
      if (user) {
        if (JSON.parse(user).password === password) {
          console.log();
          const auth = { isAuthenticated: true };
          props.handleAuth(auth);
          localStorage.setItem('auth', JSON.stringify(auth));
        } else {
          alert('Введен неправильный пароль, пожалуйста, попробуйте снова');
        }
      } else {
        alert(
          'Пользователя с таким email не существует, пожалуйста зарегистрируйтесь'
        );
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
      inputs={props.loginInputs}
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
