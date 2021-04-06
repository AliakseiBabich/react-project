import React, { useState } from 'react';
import Form from '../Form/Form.component';
import Table from '../Table/Table.component';
import NewSurveyQuestionForm from '../NewSurveyQuestionForm/NewSurveyQuestionForm.component';
import cloneDeep from 'lodash/cloneDeep';

const questionsStore = [];

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
  const [questionText, updateQuestionText] = useState({});
  const [inputsState, addNewInput] = useState([]);
  const [inputText, updateInputText] = useState();

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

  const handleQuestionInput = e => {
    const { id, value } = e.target;
    updateQuestionText(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleQuestionInputSubmit = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const question = cloneDeep(questionState);
      const inputs = cloneDeep(inputsState);
      question.map(q => {
        q.questionName = questionText[q.id];
        inputs.type = q.type;
        q.inputs = inputs;
      });
      addNewQuestion(question);
      updateQuestionText({});
    }
  };

  const newQuestion = questionState.map((q, i) => {
    return (
      <NewSurveyQuestionForm
        newQuestionInfo={q}
        key={i}
        className="question-form"
        questionText={questionText}
        onQuestionInputChange={handleQuestionInput}
        onQuestionInputSubmit={handleQuestionInputSubmit}
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
