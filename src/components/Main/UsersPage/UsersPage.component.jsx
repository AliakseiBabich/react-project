import React from 'react';
import Table from '../Table/Table.component';

const UsersPage = () => {
  const tableHeaderData = [
    'Имя',
    'Роль',
    'Зарегистрирован',
    'Опросы',
    'Действия'
  ];
  const tableContentData = [
    {
      name: 'Alex',
      role: 'admin',
      registerDate: '01.01.2021',
      surveys: '20',
      actions: 'null',
      id: 1
    },
    {
      name: 'Ivan',
      role: 'user',
      registerDate: '01.01.2021',
      surveys: '10',
      actions: 'null',
      id: 2
    },
    {
      name: 'Pete',
      role: 'user',
      registerDate: '01.01.2021',
      surveys: '12',
      actions: 'null',
      id: 3
    },
    {
      name: 'Maria',
      role: 'user',
      registerDate: '01.01.2021',
      surveys: '15',
      actions: 'null',
      id: 4
    },
    {
      name: 'Sasha',
      role: 'user',
      registerDate: '01.01.2021',
      surveys: '8',
      actions: 'null',
      id: 5
    },
    {
      name: 'Denis',
      role: 'user',
      registerDate: '01.01.2021',
      surveys: '2',
      actions: 'null',
      id: 6
    },
    {
      name: 'Pavel',
      role: 'user',
      registerDate: '01.01.2021',
      surveys: '18',
      actions: 'null',
      id: 7
    },
    {
      name: 'Mickle',
      role: 'user',
      registerDate: '01.01.2021',
      surveys: '11',
      actions: 'null',
      id: 8
    },
    {
      name: 'Irina',
      role: 'user',
      registerDate: '01.01.2021',
      surveys: '4',
      actions: 'null',
      id: 9
    }
  ];
  const tableFooterData = [
    { ['Всего пользователей']: tableContentData.length }
  ];
  return (
    <div className="users-page">
      <h3>Пользователи</h3>
      <Table
        headerData={tableHeaderData}
        contentData={tableContentData}
        footerData={tableFooterData}
      />
    </div>
  );
};

export default UsersPage;
