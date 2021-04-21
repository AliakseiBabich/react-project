import React from 'react';
import Table from '../Table';
import { TABLE_HEADERS } from '../../../constants/constants';

const UsersPage = props => {
  const users = localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users'))
    : [];
  const tableFooterData = [{ ['Всего пользователей']: users.length }];
  return (
    <div className="users-page">
      <h3>Пользователи</h3>
      <Table
        headerData={TABLE_HEADERS.usersTable}
        contentData={users}
        footerData={tableFooterData}
      />
    </div>
  );
};

export default UsersPage;
