import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import About from './components/Main/About';
import Login from './components/Main/Login';
import RegisterForm from './components/Main/Register';
import Navigation from './components/Main/Navigation';
import Panel from './components/Main/Panel';
import UsersPage from './components/Main/UsersPage';
import MySurveysPage from './components/Main/MySurveysPage';
import NewSurveyPage from './components/Main/NewSurveyPage';
import DraftsPage from './components/Main/DraftsPage';

const useRoutes = props => {
  const mainText = () => {
    return (
      <Route
        exact
        path="/"
        component={() => (
          <div className="main-text">
            <p>Приветствуем вас в нашей системе.</p>
            <p>
              Для прохождения опроса пожалуйста войдите в ваш личный кабинет.
            </p>
            <p>
              Если у вас ещё нет учетной записи, пожалуйста зарегистрируйтесь.
            </p>
          </div>
        )}
      />
    );
  };

  if (localStorage.getItem('auth')) {
    return (
      <Switch>
        {mainText()}
        <Route exact path="/about" component={About} />
        <Route exact path="/home">
          <Navigation />
          <Panel />
        </Route>
        <Route
          path="/home/new_survey"
          render={() => (
            <>
              <Navigation />
              <NewSurveyPage
                surveyParameters={props.inputs.newSurveyParamTypes}
              />
            </>
          )}
        ></Route>
        <Route path="/home/my_surveys">
          <Navigation />
          <MySurveysPage />
        </Route>
        <Route path="/home/drafts">
          <Navigation />
          <DraftsPage />
        </Route>
        <Route path="/home/users">
          <Navigation />
          <UsersPage mockupData={props.mockups.usersTableContentData} />
        </Route>
        <Redirect from="/login" to="/home" />
      </Switch>
    );
  }
  return (
    <Switch>
      {mainText()}
      <Route exact path="/about" render={() => <About />} />
      <Route
        path="/login"
        render={() => (
          <Login
            loginInputs={props.inputs.login}
            authState={props.authState}
            handleAuth={props.handleAuth}
          />
        )}
      />
      <Route
        path="/register"
        render={() => <RegisterForm registerInputs={props.inputs.register} />}
      />
      <Redirect from="login" to="/register" />
    </Switch>
  );
};

export default useRoutes;
