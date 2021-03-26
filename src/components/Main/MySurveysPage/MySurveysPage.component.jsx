import React from 'react';
import Table from '../Table/Table.component';

const MySurveysPage = () => {
  const tableHeaderData = [
    'Название',
    'Изменен',
    'Ответы',
    'Ссылка',
    'Результаты',
    'Действия'
  ];
  const tableContentData = [
    {
      name: 'Опрос номер 1',
      changeDate: '01.01.2021',
      answersNumber: '20',
      surveyUrl: 'ссылка на опрос',
      resultUrl: 'результаты',
      actions: 'null',
      id: 1
    },
    {
      name: 'Опрос номер 2',
      changeDate: '01.01.2021',
      answersNumber: '20',
      surveyUrl: 'ссылка на опрос',
      resultUrl: 'результаты',
      actions: 'null',
      id: 2
    },
    {
      name: 'Опрос номер 3',
      changeDate: '01.01.2021',
      answersNumber: '20',
      surveyUrl: 'ссылка на опрос',
      resultUrl: 'результаты',
      actions: 'null',
      id: 3
    },
    {
      name: 'Опрос номер 4',
      changeDate: '01.01.2021',
      answersNumber: '20',
      surveyUrl: 'ссылка на опрос',
      resultUrl: 'результаты',
      actions: 'null',
      id: 4
    },
    {
      name: 'Опрос номер 5',
      changeDate: '01.01.2021',
      answersNumber: '20',
      surveyUrl: 'ссылка на опрос',
      resultUrl: 'результаты',
      actions: 'null',
      id: 5
    },
    {
      name: 'Опрос номер 6',
      changeDate: '01.01.2021',
      answersNumber: '20',
      surveyUrl: 'ссылка на опрос',
      resultUrl: 'результаты',
      actions: 'null',
      id: 6
    },
    {
      name: 'Опрос номер 7',
      changeDate: '01.01.2021',
      answersNumber: '20',
      surveyUrl: 'ссылка на опрос',
      resultUrl: 'результаты',
      actions: 'null',
      id: 7
    },
    {
      name: 'Опрос номер 8',
      changeDate: '01.01.2021',
      answersNumber: '20',
      surveyUrl: 'ссылка на опрос',
      resultUrl: 'результаты',
      actions: 'null',
      id: 8
    },
    {
      name: 'Опрос номер 9',
      changeDate: '01.01.2021',
      answersNumber: '20',
      surveyUrl: 'ссылка на опрос',
      resultUrl: 'результаты',
      actions: 'null',
      id: 9
    },
    {
      name: 'Опрос номер 10',
      changeDate: '01.01.2021',
      answersNumber: '20',
      surveyUrl: 'ссылка на опрос',
      resultUrl: 'результаты',
      actions: 'null',
      id: 10
    },
    
  ];
  const tableFooterData = [{ ['Всего опросов']: tableContentData.length }];
  return (
    <div className="my-surveys-page">
      <h3>Мои опросы</h3>
      <Table
        headerData={tableHeaderData}
        contentData={tableContentData}
        footerData={tableFooterData}
      />
    </div>
  );
};

export default MySurveysPage;
