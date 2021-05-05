/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './App.sass';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

const App = props => {
  const initAuthState = { isAuthenticated: false, isRegistered: false };
  const [authState, setAuth] = useState(initAuthState);

  const logged = JSON.parse(localStorage.getItem('auth'));

  return (
    <div className="app-wrapper">
      <Header logged={logged} />
      <Main
        authState={authState}
        handleAuth={setAuth}
        logged={logged}
        inputs={props.inputs}
        tableHeaders={props.tableHeaders}
        mockups={props.mockups}
      />
      <Footer />
    </div>
  );
};

export default App;
