import React, { useState } from 'react';
import Button from '../Button/Button.component';
import Input from '../Input/Input.component';
import classNames from 'classnames';
import ReactStars from 'react-rating-stars-component';

const NewSurveyQuestionForm = props => {
  const questionFormClass = classNames(props.className);

  let answers = [];

  if (props.newQuestionInfo.answers) {
    const type = props.newQuestionInfo.type;
    if (type === 'radio' || type === 'checkbox') {
      props.newQuestionInfo.answers?.map((a, i) => {
        const id = i + 1;
        answers.push(
          <div key={id} className={`${questionFormClass}-answers-wrapper`}>
            <Input
              type={type}
              id={id}
              className={`${questionFormClass}-${type}-input`}
            />
            <label htmlFor={id}>{a.answer}</label>
          </div>
        );
      });
      answers.push(
        <div className={`${questionFormClass}-answers-wrapper`} key={type}>
          <Input
            type={type}
            id={type}
            className={`${questionFormClass}-${type}-input`}
          />
          <Input
            type="text"
            value={props.inputText[`${type}-input`]}
            id={`${type}-input`}
            placeholder="введите вариант ответа"
            onChange={props.onInputChange}
            onSubmit={props.onInputSubmit}
          />
        </div>
      );
    } else if (type === 'text') {
      answers = <textarea></textarea>;
    } else if (type === 'file') {
      answers = (
        <Input type={type} className={`${questionFormClass}-${type}-input`} />
      );
    } else if (type === 'rating') {
      answers = <ReactStars size={24}></ReactStars>;
    } else if (type === 'range') {
      answers = (
        <Input type={type} className={`${questionFormClass}-${type}-input`} />
      );
    }
  }

  const buttons = props.btns
    ? props.btns.map(btn => {
        return (
          <Button
            {...btn}
            key={btn.value ? btn.value : null}
            className={`${questionFormClass}-question-btn`}
            onClick={btn.onClick}
          />
        );
      })
    : null;

  const qHead = () => {
    if (props.newQuestionInfo.questionName) {
      return (
        <h2 className="form-container-header">
          {props.newQuestionInfo.questionName}
        </h2>
      );
    } else {
      return (
        <Input
          value={props.inputText[props.newQuestionInfo.id]}
          onChange={props.onInputChange}
          onSubmit={props.onInputSubmit}
          id={props.newQuestionInfo.id}
          placeholder="введите ваш вопрос"
          type="text"
          className={`${questionFormClass}-question-input`}
        />
      );
    }
  };

  return (
    <form className={questionFormClass}>
      {qHead()}
      {answers}
      <div className={`${questionFormClass}-buttons-wrapper`}>{buttons}</div>
    </form>
  );
};

export default NewSurveyQuestionForm;
