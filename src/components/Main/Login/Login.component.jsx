import React from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../Form/Form.component';

const Login = props => {
  const state = {
    email: '',
    password: ''
  };

  return (
    <Form
      header="Вход"
      inputs={props.loginInputs}
      className="login-form"
      action="/enter"
      btnText="Войти"
      state={state}
      btnClassName="login-button"
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
