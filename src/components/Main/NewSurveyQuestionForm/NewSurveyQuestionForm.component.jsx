import React, { useState } from 'react';
import Button from '../Button/Button.component';
import Input from '../Input/Input.component';
import classNames from 'classnames';

const NewSurveyQuestionForm = props => {
  const questionFormClass = classNames(props.className);

  const questionFormBtns = [
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

  const handleSave = e => {
    e.preventDefault();
  };

  const handleCancel = e => {
    e.preventDefault();
  };

  // const inputs = props.inputs
  //   ? props.inputs.map(input => {
  //       const inputItem = (
  //         <Input
  //           {...input}
  //           key={input.id}
  //           value={
  //             input.state
  //               ? input.state[input.id]
  //               : props.questionBodyState[input.id]
  //           }
  //           onChange={props.onChange}
  //           className={input.className}
  //         />
  //       );
  //       return inputItem;
  //     })
  //   : null;

  const inputs = () => {
    if (props.newQuestionInfo.inputs) {
      const type = props.newQuestionInfo.inputs.type;
      if (type === 'text') {
        return <textarea></textarea>;
      } else if (type === 'file') {
        return <Input type={type}></Input>;
      }
    }
  };

  const buttons = questionFormBtns.map(btn => {
    return <Button {...btn} key={btn.value ? btn.value : null} />;
  });

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
          value={props.questionText[props.newQuestionInfo.id]}
          onChange={props.onQuestionInputChange}
          onSubmit={props.onQuestionInputSubmit}
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
      {inputs()}
      {props.children}
      <div className={`${questionFormClass}-buttons-wrapper`}>{buttons}</div>
    </form>
  );
};

export default NewSurveyQuestionForm;
