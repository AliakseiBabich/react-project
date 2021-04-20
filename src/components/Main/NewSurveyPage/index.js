import React, { useState } from 'react';
import Form from '../Form';
import Table from '../Table';
import NewSurveyQuestionForm from '../NewSurveyQuestionForm';
import cloneDeep from 'lodash/cloneDeep';
import Input from '../Input';
import Button from '../Button';
import { nanoid } from 'nanoid';
import { newSurveyQuestionTypes } from '~/constants/constants';
import { store as notificationsStore } from 'react-notifications-component';
import { notificationConfig } from '~/constants/constants';

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
    question = newSurveyQuestionTypes.find(
      ({ name }) => name === e.target.innerText
    );
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
      notificationConfig.message = 'Добавьте и сохраните хотя бы один вопрос';
      notificationsStore.addNotification(notificationConfig);
    } else {
      const survey = cloneDeep(surveyState);
      survey.id = nanoid();
      const date = new Date();
      survey.saveDate = `${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}`;
      if (value === 'Сохранить') {
        localStorage.setItem(`survey: ${survey.id}`, JSON.stringify(survey));
      } else {
        localStorage.setItem(
          `survey_draft: ${survey.id}`,
          JSON.stringify(survey)
        );
      }
      notificationConfig.type = 'success';
      notificationConfig.message = 'Ваш опрос сохранен';
      notificationsStore.addNotification(notificationConfig);
    }
  };

  const handleQuestionSave = e => {
    e.preventDefault();
    const { type, questionName, answers } = questionState;
    if (!questionName) {
      notificationConfig.message = 'Введите вопрос и нажмите Enter';
      notificationsStore.addNotification(notificationConfig);
    } else if (
      (type === 'radio' || type === 'checkbox') &&
      answers.length < 2
    ) {
      notificationConfig.message = 'Добавьте ещё один вариант ответа';
      notificationsStore.addNotification(notificationConfig);
    } else {
      let question = cloneDeep(questionState);
      const survey = cloneDeep(surveyState);
      question.id = `q-${nanoid()}`;
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
          contentData={newSurveyQuestionTypes}
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
