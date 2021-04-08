import React, { useState } from 'react';
import Form from '../Form/Form.component';
import Table from '../Table/Table.component';
import NewSurveyQuestionForm from '../NewSurveyQuestionForm/NewSurveyQuestionForm.component';
import cloneDeep from 'lodash/cloneDeep';

const NewSurveyPage = props => {
  const formState = {
    anonimous: false,
    show_q_number: false,
    show_p_numbers: false,
    random: false,
    obligatory: false,
    indicator: false
  };

  const [questionState, addNewQuestion] = useState([]);
  const [inputText, updateInputText] = useState({});

  const handleQuestionTypeClick = e => {
    e.preventDefault();
    const question = cloneDeep(questionState);
    cloneDeep(props.surveyQuestionTypes).map(q => {
      if (q.name === e.target.innerText) {
        question[0] = q;
      }
    });
    addNewQuestion(question);
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
      question.map(q => {
        if (e.target.id === q.id) {
          q.questionName = inputText[q.id];
          q.answers = [];
        } else {
          q.answers.push({ answer: e.target.value });
        }
      });
      addNewQuestion(question);
      updateInputText({});
    }
  };

  const handleSave = e => {
    e.preventDefault();
    if (!questionState[0].questionName) {
      alert('Введите вопрос');
    } else if (
      (questionState[0].type === 'radio' ||
        questionState[0].type === 'checkbox') &&
      questionState[0].answers.length < 2
    ) {
      alert('Добавьте ещё один вариант ответа');
    } else {
      console.log('saved');
    }
  };

  const handleCancel = e => {
    e.preventDefault();
  };

  const questionFormBtns = [
    {
      value: 'Сохранить',
      type: 'submit',
      className: 'question-button',
      onClick: handleSave
    },
    {
      value: 'Отмена',
      type: 'submit',
      className: 'question-button',
      onClick: handleCancel
    }
  ];

  const newQuestion = questionState.map((q, i) => {
    return (
      <NewSurveyQuestionForm
        newQuestionInfo={q}
        key={i}
        className="question-form"
        inputText={inputText}
        btns={questionFormBtns}
        onInputChange={handleInput}
        onInputSubmit={handleInputSubmit}
      />
    );
  });

  return (
    <div className="newSurveyPage">
      <div className="newSurveyPage-newsurvey">
        <h3>Новый опрос</h3>
        <div className="newSurveyPage-newsurvey-container">{newQuestion}</div>
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
