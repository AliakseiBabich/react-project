import React, { useState } from 'react';
import Form from '../Form';
import Table from '../Table';
import NewSurveyQuestionForm from '../NewSurveyQuestionForm';
import cloneDeep from 'lodash/cloneDeep';
import Input from '../Input';
import Button from '../Button';
import { nanoid } from 'nanoid';
import { newSurveyQuestionTypes } from '~/constants/constants';
import { showNotification } from '~/helpers';
import correctLogoSrc from '~/assets/icons/correct.svg';
import deleteLogoSrc from '~/assets/icons/delete.svg';
import { useLocation } from 'react-router-dom';

const NewSurveyPage = props => {
  const location = useLocation();
  const correctIcon = <img src={correctLogoSrc} alt="correct" />;
  const deleteIcon = <img src={deleteLogoSrc} alt="delete" />;

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
    pages: []
  };

  const initPageIndex = 0;

  const [surveyState, updateSurveyState] = useState(
    location?.state ? location.state : initSurveyState
  );
  const [pageState, updatePageNum] = useState(initPageIndex);
  const [questionState, updateQuestionState] = useState({});
  const [inputText, updateInputText] = useState({});

  const handleQuestionTypeClick = e => {
    e.preventDefault();
    let question = cloneDeep(questionState);
    if (Object.keys(question).length) {
      return showNotification({
        type: 'warning',
        message: 'Сохраните вопрос или нажмите отмена для выбора нового'
      });
    }
    const survey = cloneDeep(surveyState);
    if (!survey.pages.length) {
      const newPage = [];
      survey.pages.push(newPage);
      updateSurveyState(survey);
    }
    question = cloneDeep(newSurveyQuestionTypes).find(
      ({ name }) => name === e.target.innerText
    );
    question.name = '';
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
    if (e.key === 'Enter' && e.target.value) {
      e.preventDefault();
      const question = cloneDeep(questionState);
      const survey = cloneDeep(surveyState);
      if (e.target.id === question.id) {
        question.name = inputText[question.id];
        question.answers = [];
      } else if (e.target.id === survey.id) {
        survey.name = inputText[survey.id];
        if (!survey.pages.length) {
          const newPage = [];
          survey.pages.push(newPage);
        }
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
    const pages = surveyState.pages;
    const value = e.target.innerText;
    if (!pages.length || !pages[0]?.length) {
      showNotification({
        type: 'warning',
        message: 'Добавьте и сохраните хотя бы один вопрос'
      });
    } else {
      const survey = cloneDeep(surveyState);
      survey.id = nanoid();
      survey.answersNumber = 0;
      survey.surveyUrl = `/home/survey/${survey.id}`;
      const date = new Date();
      survey.saveDate = `${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}`;
      if (value === 'Сохранить') {
        const surveysList = localStorage.getItem('surveys')
          ? JSON.parse(localStorage.getItem('surveys'))
          : [];
        surveysList.push(survey);
        localStorage.setItem(`surveys`, JSON.stringify(surveysList));
      } else {
        const draftsList = localStorage.getItem('drafts')
          ? JSON.parse(localStorage.getItem('drafts'))
          : [];
        draftsList.push(survey);
        localStorage.setItem(`drafts`, JSON.stringify(draftsList));
      }
      showNotification({
        type: 'success',
        message: 'Ваш опрос сохранён'
      });
      updateSurveyState(initSurveyState);
    }
  };

  const handleQuestionSave = e => {
    e.preventDefault();
    const { type, name, answers } = questionState;
    if (!name) {
      showNotification({
        type: 'warning',
        message: 'Введите вопрос и нажмите Enter'
      });
    } else if (
      (type === 'radio' || type === 'checkbox') &&
      answers.length < 2
    ) {
      showNotification({
        type: 'warning',
        message: 'Добавьте ещё один вариант ответа'
      });
    } else {
      let question = cloneDeep(questionState);
      const survey = cloneDeep(surveyState);
      question.id = `q-${nanoid()}`;
      survey.pages[pageState].push(question);
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

  const handleAddPage = e => {
    e.preventDefault();
    const survey = cloneDeep(surveyState);
    const newPage = [];
    survey.pages.push(newPage);
    updateSurveyState(survey);
    const page = survey.pages.length - 1;
    updatePageNum(page);
  };

  const handleQuestionCorrection = e => {
    e.preventDefault();
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
        type: 'reset',
        className: 'header-button',
        onClick: handleCancel
      },
      {
        value: 'Новая страница',
        type: 'submit',
        className: 'header-button',
        onClick: handleAddPage
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
        type: 'reset',
        className: 'question-button',
        onClick: handleCancel
      }
    ],
    correctIconBtn: [
      {
        value: correctIcon,
        type: 'button',
        className: 'addedQuestion-button',
        onClick: handleQuestionCorrection
      }
    ],
    deleteIconBtn: [
      {
        value: deleteIcon,
        type: 'button',
        className: 'addedQuestion-button',
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
    let headerInfo;
    if (surveyState.name) {
      headerInfo = <h2>{surveyState.name}</h2>;
    } else {
      headerInfo = (
        <Input
          value={inputText[surveyState.id]}
          onChange={handleInput}
          onSubmit={handleInputSubmit}
          id={surveyState.id}
          placeholder="введите название опроса"
          type="text"
          className={`${surveyState.id}-input`}
        />
      );
    }
    return (
      <>
        <div className="header-wrapper">
          <h3>Новый опрос:</h3>
          {headerInfo}
        </div>
        <div className="header-wrapper-btns">{surveyBtns}</div>
      </>
    );
  };

  const addedQuestions = surveyState.pages[pageState]?.map((q, i) => {
    return (
      <NewSurveyQuestionForm
        newQuestionInfo={q}
        key={i}
        qNumber={i + 1}
        className="question-saved"
        btns={buttonsData.correctIconBtn}
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

  const pageToShow = surveyState.pages.length ? (
    <div className={`newSurveyPage-newsurvey__survey-page`}>
      {addedQuestions}
      {newQuestion}
    </div>
  ) : null;

  const handlePageClick = i => e => {
    e.preventDefault();
    updatePageNum(i);
  };

  const pageBtns = surveyState.pages?.map((p, i) => {
    let pageBtnClass = 'newSurveyPage-newsurvey__pageBtn';
    if (pageState === i) {
      pageBtnClass = 'newSurveyPage-newsurvey__pageBtn pageBtn--active';
    }
    return (
      <Button
        className={pageBtnClass}
        key={i}
        value={`Cтраница ${i + 1}`}
        onClick={handlePageClick(i)}
      />
    );
  });

  return (
    <div className="newSurveyPage">
      <div className="newSurveyPage-newsurvey">
        <div className="newSurveyPage-newsurvey__header">{sHead()}</div>
        {pageBtns}
        {pageToShow}
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
