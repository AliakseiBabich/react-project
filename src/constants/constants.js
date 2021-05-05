export const INPUTS = {
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
  ]
};

export const LOGIN_INPUTS = [
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
];

export const REGISTER_INPUTS = [
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
];

export const newSurveyQuestionTypes = [
  {
    type: 'radio',
    id: 'one_var',
    name: 'Варианты ответа (один)'
  },
  {
    type: 'checkbox',
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
    type: 'rating',
    id: 'rating',
    name: 'Рейтинг в звездах'
  },
  {
    type: 'range',
    id: 'scale',
    name: 'Шкала'
  }
];

export const TABLE_HEADERS = {
  usersTable: {
    name: 'Имя',
    role: 'Роль',
    registerDate: 'Зарегистрирован',
    surveys: 'Опросы',
    actions: 'Действия'
  },
  mySurveysTableAdmin: {
    name: 'Название',
    saveDate: 'Изменен',
    answersNumber: 'Ответы',
    surveyUrl: 'Ссылка',
    resultUrl: 'Результаты',
    actions: 'Действия'
  },
  mySurveysTableUser: {
    name: 'Название',
    surveyUrl: 'Ссылка'
  }
};

export const NOTIFICATION_CONFIG = {
  message: '',
  type: 'warning',
  insert: 'bottom',
  container: 'bottom-left',
  animationIn: ['animate__animated', 'animate__fadeIn'],
  animationOut: ['animate__animated', 'animate__fadeOut'],
  dismiss: {
    duration: 3500
  }
};
