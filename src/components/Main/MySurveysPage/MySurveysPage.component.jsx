import React from 'react';
import Table from '../Table/Table.component';

const MySurveysPage = props => {
  const surveys = Object.entries(localStorage)?.reduce((acc, entry) => {
    if (entry[0].includes('survey:')) {
      acc.push(JSON.parse(entry[1]));
    }
    return acc;
  }, []);
  const tableFooterData = [{ ['Всего опросов']: surveys.length }];
  return (
    <div className="my-surveys-page">
      <h3>Мои опросы</h3>
      <Table
        headerData={props.tableHeaders}
        contentData={surveys}
        footerData={tableFooterData}
      />
    </div>
  );
};

export default MySurveysPage;
