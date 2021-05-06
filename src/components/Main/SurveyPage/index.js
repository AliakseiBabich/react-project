import React, { useState } from 'react';
import NewSurveyQuestionForm from '../NewSurveyQuestionForm';
import cloneDeep from 'lodash/cloneDeep';
import Button from '../Button';
import { nanoid } from 'nanoid';
import { showNotification } from '~/helpers';
import { useLocation } from 'react-router-dom';

const SurveyPage = () => {
  const location = useLocation();

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

  const handlePagesNavigation = e => {
    e.preventDefault();
    console.log(e.target.innerText);
    if (e.target.innerText === 'Предыдущая страница' && pageState > 0) {
      updatePageNum(pageState - 1);
    } else if (
      e.target.innerText === 'Следующая страница' &&
      pageState < surveyState.pages.length - 1
    ) {
      updatePageNum(pageState + 1);
    } else {
      updatePageNum(pageState);
    }
  };

  const btnsData = [
    {
      value: 'Предыдущая страница',
      type: 'button',
      className: 'pages-nav-button',
      onClick: handlePagesNavigation
    },
    {
      value: 'Следующая страница',
      type: 'button',
      className: 'pages-nav-button',
      onClick: handlePagesNavigation
    }
  ];

  const questionsOnPage = surveyState.pages[pageState]?.map((q, i) => {
    return (
      <NewSurveyQuestionForm
        newQuestionInfo={q}
        key={i}
        qNumber={i + 1}
        className="question-saved"
      />
    );
  });

  const pageToShow = surveyState.pages.length ? (
    <div className={`surveyPage-survey__page`}>
      <h3>{`Страница ${pageState + 1}`}</h3>
      {questionsOnPage}
    </div>
  ) : null;

  const pageNavBtns = btnsData.map(btn => {
    return (
      <Button
        {...btn}
        key={btn.value ? btn.value : null}
        className={btn.className}
        onClick={btn.onClick}
      />
    );
  });

  return (
    <div className="surveyPage">
      <div className="surveyPage-survey">
        <div className="surveyPage-survey__header">{surveyState.name}</div>
        {pageToShow}
        <div className="surveyPage-survey__btns">{pageNavBtns}</div>
      </div>
    </div>
  );
};

export default SurveyPage;
