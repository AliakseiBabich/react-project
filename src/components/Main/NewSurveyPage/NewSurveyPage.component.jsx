import React, { useState } from 'react';
import Form from '../Form/Form.component';
import Table from '../Table/Table.component';

const questionsStore = [];

const NewSurveyPage = props => {
  const questionTypes = [
    'Варианты ответа (один)',
    'Варианты ответа (несколько)',
    'Текст',
    'Файл',
    'Рейтинг в звездах',
    'Шкала'
  ];

  const questionBtns = [
    {
      value: 'Сохранить',
      type: 'submit',
      className: 'question-button',
      onClick: () => {}
    },
    {
      value: 'Отмена',
      type: 'submit',
      className: 'question-button',
      onClick: () => {}
    }
  ];

  const formState = {
    anonimous: false,
    show_q_number: false,
    show_p_numbers: false,
    random: false,
    obligatory: false,
    indicator: false
  };

  const [questionsState, addQuestion] = useState(questionsStore);

  const questions = questionsState.map((q, i) => {
    return (
      <Form
        header={q.name}
        key={i}
        buttons={questionBtns}
        className="newSurveyPage-newsurvey-container-question"
      ></Form>
    );
  });

  const handleQuestionTypeClick = e => {
    e.preventDefault();
    const questions = [...questionsState];
    questions.push({ name: e.target.innerText });
    addQuestion(questions);
  };

  return (
    <div className="newSurveyPage">
      <div className="newSurveyPage-newsurvey">
        <h3>Новый опрос</h3>
        <div className="newSurveyPage-newsurvey-container">{questions}</div>
      </div>
      <div className="newSurveyPage-surveyParams">
        <Table
          className="newSurveyPage-surveyParams-questions"
          headerData={['Тип вопроса']}
          contentData={questionTypes}
          onClick={handleQuestionTypeClick}
        ></Table>
        <Table
          className="newSurveyPage-surveyParams-parameters"
          headerData={['Параметры опроса']}
        >
          <Form
            className="newSurveyPage-surveyParams-parameters-list"
            header="Параметры опроса"
            inputs={props.surveyParameters}
            state={formState}
          />
        </Table>
      </div>
    </div>
  );
};

export default NewSurveyPage;
