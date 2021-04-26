import React from 'react';
import Table from '../Table';
import { TABLE_HEADERS } from '../../../constants/constants';

const MySurveysPage = () => {
  const surveys = localStorage.getItem('surveys')
    ? JSON.parse(localStorage.getItem('surveys'))
    : [];
  const tableFooterData = [{ ['Всего опросов']: surveys.length }];
  return (
    <div className="my-surveys-page">
      <h3>Мои опросы</h3>
      <Table
        headerData={TABLE_HEADERS.mySurveysTable}
        contentData={surveys}
        footerData={tableFooterData}
      />
    </div>
  );
};

export default MySurveysPage;
