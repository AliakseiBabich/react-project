import React from 'react';
import Table from '../Table/Table.component';

const MySurveysPage = props => {
  const tableFooterData = [{ ['Всего опросов']: props.mockupData.length }];
  return (
    <div className="my-surveys-page">
      <h3>Мои опросы</h3>
      <Table
        headerData={props.tableHeaders}
        contentData={props.mockupData}
        footerData={tableFooterData}
      />
    </div>
  );
};

export default MySurveysPage;
