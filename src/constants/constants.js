export const INPUTS = {
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
      name: 'Анонимный опрос',
      className: 'paramType-input'
    },
    {
      type: 'checkbox',
      id: 'show_q_number',
      name: 'Номера вопросов',
      className: 'paramType-input'
    },
    {
      type: 'checkbox',
      id: 'show_p_numbers',
      name: 'Номера страниц опрос',
      className: 'paramType-input'
    },
    {
      type: 'checkbox',
      id: 'random',
      name: 'Случайный порядок вопросов',
      className: 'paramType-input'
    },
    {
      type: 'checkbox',
      id: 'obligatory',
      name: 'Звездочки обязательных полей',
      className: 'paramType-input'
    },
    {
      type: 'checkbox',
      id: 'indicator',
      name: 'Индикатор выполнения',
      className: 'paramType-input'
    }
  ],
  newSurveyQuestionTypes: [
    {
      type: 'radio',
      id: 'one_var',
      name: 'Варианты ответа (один)'
    },
    {
      type: 'ckeckbox',
      id: 'mult_var',
      name: 'Варианты ответа (несколько)'
    },
    {
      type: 'text',
      id: 'text',
      name: 'Текст'
    },
    { type: 'file', id: 'file', name: 'Файл' },
    {
      type: null,
      id: 'rating',
      name: 'Рейтинг в звездах'
    },
    {
      type: 'range',
      id: 'scale',
      name: 'Шкала'
    }
  ]
};

export const TABLE_HEADERS = {
  usersTable: {
    name: 'Имя',
    role: 'Роль',
    registerDate: 'Зарегистрирован',
    surveys: 'Опросы',
    actions: 'Действия'
  },
  mySurveysTable: {
    name: 'Название',
    changeDate: 'Изменен',
    answersNumber: 'Ответы',
    surveyUrl: 'Ссылка',
    resultUrl: 'Результаты',
    actions: 'Действия'
  }
};
