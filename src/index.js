/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import INPUTS from './constants';

ReactDOM.render(
  <BrowserRouter>
    <App inputs={INPUTS} />
  </BrowserRouter>,
  document.querySelector('#root')
);
