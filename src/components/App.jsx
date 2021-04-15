/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './App.sass';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { cloneDeep } from 'lodash/cloneDeep';

const App = props => {
  const initAuthState = { isAuthenticated: false };
  const [authState, setAuth] = useState(initAuthState);

  return (
    <div className="app-wrapper">
      <Header authState={authState} />
      <Main
        authState={authState}
        handleAuth={setAuth}
        inputs={props.inputs}
        tableHeaders={props.tableHeaders}
        mockups={props.mockups}
      />
      <Footer />
    </div>
  );
};

export default App;
