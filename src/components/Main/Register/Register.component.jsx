import React from 'react';
import Form from '../Form/Form.component';

const RegisterForm = props => {
  const state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  return (
    <Form
      header="Регистрация"
      inputs={props.registerInputs}
      className="register-form"
      action="/enter"
      btnText="Зарегистрироваться"
      state={state}
      btnClassName="register-button"
    ></Form>
  );
};

export default RegisterForm;
