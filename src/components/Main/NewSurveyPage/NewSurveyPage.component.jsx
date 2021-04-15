import React, { useState } from 'react';
import Form from '../Form/Form.component';
import Table from '../Table/Table.component';
import NewSurveyQuestionForm from '../NewSurveyQuestionForm/NewSurveyQuestionForm.component';
import cloneDeep from 'lodash/cloneDeep';
import Input from '../Input/Input.component';
import Button from '../Button/Button.component';
import { classNames } from 'classnames';

const NewSurveyPage = props => {
  const formState = {
    anonimous: false,
    show_q_number: false,
    show_p_numbers: false,
    random: false,
    obligatory: false,
    indicator: false
  };

  const initSurveyState = {
    name: '',
    id: 'survey-name',
    questions: []
  };

  const [surveyState, updateSurveyState] = useState(initSurveyState);
  const [questionState, updateQuestionState] = useState({});
  const [inputText, updateInputText] = useState({});

  const handleQuestionTypeClick = e => {
    e.preventDefault();
    let question = cloneDeep(questionState);
    cloneDeep(props.surveyQuestionTypes).map(q => {
      if (q.name === e.target.innerText) {
        question = q;
      }
    });
    updateQuestionState(question);
  };

  const handleInput = e => {
    const { id, value } = e.target;
    updateInputText(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleInputSubmit = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const question = cloneDeep(questionState);
      const survey = cloneDeep(surveyState);
      if (e.target.id === question.id) {
        question.questionName = inputText[question.id];
        question.answers = [];
      } else if (e.target.id === survey.id) {
        survey.name = inputText[survey.id];
        updateSurveyState(survey);
      } else {
        question.answers.push({ answer: e.target.value });
      }
      updateQuestionState(question);
      updateInputText({});
    }
  };

  const handleSurveySave = e => {
    e.preventDefault();
    const questions = surveyState.questions;
    const value = e.target.innerText;
    if (questions.length === 0) {
      alert('Добавьте и сохраните хотя бы один вопрос');
    } else {
      const survey = cloneDeep(surveyState);
      survey.id = survey.name.split(' ').join('_');
      const date = new Date();
      survey.saveDate = `${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}`;
      console.log(survey.saveDate);
      if (value === 'Сохранить') {
        localStorage.setItem(`survey: ${survey.id}`, JSON.stringify(survey));
      } else {
        localStorage.setItem(
          `survey_draft: ${survey.id}`,
          JSON.stringify(survey)
        );
      }
    }
  };

  const handleQuestionSave = e => {
    e.preventDefault();
    const { type, questionName, answers } = questionState;
    if (!questionName) {
      alert('Введите вопрос и нажмите Enter');
    } else if (
      (type === 'radio' || type === 'checkbox') &&
      answers.length < 2
    ) {
      alert('Добавьте ещё один вариант ответа');
    } else {
      let question = cloneDeep(questionState);
      const survey = cloneDeep(surveyState);
      question.id = `q-${survey.questions.length + 1}`;
      survey.questions.push(question);
      updateSurveyState(survey);
      question = {};
      updateQuestionState(question);
    }
  };

  const handleCancel = e => {
    e.preventDefault();
    if (e.target.className.includes('header')) {
      let survey = cloneDeep(surveyState);
      survey = initSurveyState;
      updateSurveyState(survey);
    }
    let question = cloneDeep(questionState);
    question = {};
    updateQuestionState(question);
  };

  const buttonsData = {
    surveyBtns: [
      {
        value: 'Сохранить',
        type: 'submit',
        className: 'header-button',
        onClick: handleSurveySave
      },
      {
        value: 'Сохранить как шаблон',
        type: 'submit',
        className: 'header-button',
        onClick: handleSurveySave
      },
      {
        value: 'Отмена',
        type: 'submit',
        className: 'header-button',
        onClick: handleCancel
      }
    ],
    questionFormBtns: [
      {
        value: 'Сохранить',
        type: 'submit',
        className: 'question-button',
        onClick: handleQuestionSave
      },
      {
        value: 'Отмена',
        type: 'submit',
        className: 'question-button',
        onClick: handleCancel
      }
    ]
  };

  const surveyBtns = buttonsData.surveyBtns.map(btn => {
    return (
      <Button
        {...btn}
        key={btn.value ? btn.value : null}
        className={btn.className}
        onClick={btn.onClick}
      />
    );
  });

  const sHead = () => {
    if (surveyState.name) {
      return (
        <>
          <div className="header-wrapper">
            <h3>Новый опрос:</h3>
            <h2>{surveyState.name}</h2>
          </div>
          <div className="header-wrapper-btns">{surveyBtns}</div>
        </>
      );
    } else {
      return (
        <div className="header-wrapper">
          <h3>Новый опрос:</h3>
          <Input
            value={inputText[surveyState.id]}
            onChange={handleInput}
            onSubmit={handleInputSubmit}
            id={surveyState.id}
            placeholder="введите название опроса"
            type="text"
            className={`${surveyState.id}-input`}
          />
        </div>
      );
    }
  };

  const survey = surveyState.questions.map((q, i) => {
    return (
      <NewSurveyQuestionForm
        newQuestionInfo={q}
        key={i}
        className="question-saved"
      />
    );
  });

  const newQuestion = (
    <NewSurveyQuestionForm
      newQuestionInfo={questionState}
      className="question-form"
      inputText={inputText}
      btns={buttonsData.questionFormBtns}
      onInputChange={handleInput}
      onInputSubmit={handleInputSubmit}
    />
  );

  return (
    <div className="newSurveyPage">
      <div className="newSurveyPage-newsurvey">
        <div className="newSurveyPage-newsurvey-header-container">
          {sHead()}
        </div>
        <div className="newSurveyPage-newsurvey-survey-container">
          {survey}
          {newQuestion}
        </div>
      </div>
      <div className="newSurveyPage-surveyParams">
        <Table
          className="newSurveyPage-surveyParams-questions"
          headerData={{ name: 'Тип вопроса' }}
          contentData={props.surveyQuestionTypes}
          onClick={handleQuestionTypeClick}
        />
        <Table
          className="newSurveyPage-surveyParams-parameters"
          headerData={{ name: 'Параметры опроса' }}
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
