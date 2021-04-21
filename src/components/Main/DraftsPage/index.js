import React from 'react';
import classNames from 'classnames';
import Button from '../Button';

const DraftsPage = () => {
  const draftsPageClass = classNames('drafts-page');

  const drafts = Object.entries(localStorage)
    ?.reduce((acc, entry) => {
      if (entry[0].includes('survey_draft:')) {
        acc.push(JSON.parse(entry[1]));
      }
      return acc;
    }, [])
    ?.map((draft, i) => {
      return (
        <div className="draft-item" key={i}>
          <h4 className="draft-item-header">{`Шаблон ${i + 1}`}</h4>
          <div className="draft-item-info">
            <div className="draft-item-info-questions">{`Вопросов: ${draft.questions?.length}`}</div>
          </div>
          <Button
            type="submit"
            value="создать опрос"
            className="draft-item-btn"
          />
        </div>
      );
    });

  console.log(drafts);
  const footerData = [{ ['Всего шаблонов']: 10 }];

  return (
    <div className={draftsPageClass}>
      <h3>Шаблоны</h3>
      <div className={`${draftsPageClass}-container`}>{drafts}</div>
    </div>
  );
};

export default DraftsPage;
