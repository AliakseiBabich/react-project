import React from 'react';
import classNames from 'classnames';
import Button from '../Button';

const DraftsPage = () => {
  const draftsPageClass = classNames('drafts-page');

  const drafts = (localStorage.getItem('drafts')
    ? JSON.parse(localStorage.getItem('drafts'))
    : []
  )?.map((draft, i) => {
    const pagesNumber = draft.pages?.length;
    const questionsNumber = draft.pages?.reduce((acc, page) => {
      return (acc += page.length);
    }, 0);
    console.log(questionsNumber);
    return (
      <div className={`${draftsPageClass}__item`} key={i}>
        <h4 className={`${draftsPageClass}__item__header`}>{`Шаблон ${
          i + 1
        }`}</h4>
        <div className={`${draftsPageClass}__item__info`}>
          <span className={`${draftsPageClass}__item__info__questions`}>
            {`Вопросов: ${questionsNumber}`}
          </span>
          <span className={`${draftsPageClass}__item__info__pages`}>
            {`Страниц: ${pagesNumber}`}
          </span>
        </div>
        <Button
          type="submit"
          value="создать опрос"
          className={`${draftsPageClass}__item__btn`}
        />
      </div>
    );
  });

  const footerData = <div>{`Всего шаблонов: ${drafts.length}`}</div>;

  return (
    <div className={draftsPageClass}>
      <h3>Шаблоны</h3>
      <div className={`${draftsPageClass}-container`}>{drafts}</div>
      {footerData}
    </div>
  );
};

export default DraftsPage;
