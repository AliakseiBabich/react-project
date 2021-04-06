/* eslint-disable no-unused-vars */
import React from 'react';
import './App.sass';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

const App = props => {
  const isAuthenticated = true;
  return (
    <div className="app-wrapper">
      <Header isAuthenticated={isAuthenticated} />
      <Main
        isAuthenticated={isAuthenticated}
        inputs={props.inputs}
        tableHeaders={props.tableHeaders}
        mockups={props.mockups}
      />
      <Footer />
    </div>
  );
};

export default App;
