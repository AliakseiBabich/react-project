const INPUTS = {
  register: [
    {
      type: 'text',
      id: 'firstname',
      name: 'user_firstname',
      placeholder: 'Имя'
    },
    {
      type: 'text',
      id: 'lastname',
      name: 'user_lastname',
      placeholder: 'Фамилия'
    },
    {
      type: 'email',
      id: 'email',
      name: 'user_email',
      placeholder: 'Логин (email)'
    },
    {
      type: 'password',
      id: 'password',
      name: 'user_password',
      placeholder: 'Пароль'
    },
    {
      type: 'password',
      id: 'confirmPassword',
      name: 'user_confirmPassword',
      placeholder: 'Повторите пароль'
    }
  ],
  login: [
    {
      type: 'email',
      id: 'email',
      name: 'user_email',
      placeholder: 'Логин (email)'
    },
    {
      type: 'password',
      id: 'password',
      name: 'user_password',
      placeholder: '********'
    }
  ],
  newSurveyParamTypes: [
    {
      type: 'checkbox',
      id: 'anonimous',
      name: 'Анонимный опрос'
    },
    {
      type: 'checkbox',
      id: 'show_q_number',
      name: 'Номера вопросов'
    },
    {
      type: 'checkbox',
      id: 'show_p_numbers',
      name: 'Номера страниц опрос'
    },
    {
      type: 'checkbox',
      id: 'random',
      name: 'Случайный порядок вопросов'
    },
    {
      type: 'checkbox',
      id: 'obligatory',
      name: 'Звездочки обязательных полей'
    },
    {
      type: 'checkbox',
      id: 'indicator',
      name: 'Индикатор выполнения'
    }
  ]
};

export default INPUTS;
