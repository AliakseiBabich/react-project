import React from 'react';
import Table from '../Table';
import { TABLE_HEADERS } from '../../../constants/constants';

const MySurveysPage = props => {
  const userLogged = props.logged?.user;

  const surveys = localStorage.getItem('surveys')
    ? JSON.parse(localStorage.getItem('surveys'))
    : [];
  const tableFooterData = [{ ['Всего опросов']: surveys.length }];
  return (
    <div className="my-surveys-page">
      <h3>Мои опросы</h3>
      <Table
        headerData={
          userLogged?.role === 'admin'
            ? TABLE_HEADERS.mySurveysTableAdmin
            : TABLE_HEADERS.mySurveysTableUser
        }
        contentData={surveys}
        footerData={tableFooterData}
      />
    </div>
  );
};

export default MySurveysPage;
