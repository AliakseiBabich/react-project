import React from 'react';
import Table from '../Table/Table.component';

const UsersPage = props => {
  const tableFooterData = [
    { ['Всего пользователей']: props.mockupData.length }
  ];
  return (
    <div className="users-page">
      <h3>Пользователи</h3>
      <Table
        headerData={props.tableHeaders}
        contentData={props.mockupData}
        footerData={tableFooterData}
      />
    </div>
  );
};

export default UsersPage;
