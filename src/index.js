/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { INPUTS, TABLE_HEADERS } from './constants/constants';
import { mockups } from './constants/mockups';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

ReactDOM.render(
  <BrowserRouter>
    <ReactNotification />
    <App inputs={INPUTS} tableHeaders={TABLE_HEADERS} mockups={mockups} />
  </BrowserRouter>,
  document.querySelector('#root')
);
