import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import About from './components/Main/About/About';
import Login from './components/Main/Login/Login.component';
import RegisterForm from './components/Main/Register/Register.component';
import Navigation from './components/Main/Navigation/Navigation.component';
import Panel from './components/Main/Panel/Panel.component';
import UsersPage from './components/Main/UsersPage/UsersPage.component';
import MySurveysPage from './components/Main/MySurveysPage/MySurveysPage.component';
import NewSurveyPage from './components/Main/NewSurveyPage/NewSurveyPage.component';

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

  if (props.authState.isAuthenticated || localStorage.getItem('auth')) {
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
                surveyQuestionTypes={props.inputs.newSurveyQuestionTypes}
              />
            </>
          )}
        ></Route>
        <Route path="/home/my_surveys">
          <Navigation />
          <MySurveysPage
            tableHeaders={props.tableHeaders.mySurveysTable}
            mockupData={props.mockups.mySurveysTableContentMockup}
          />
        </Route>
        <Route path="/home/users">
          <Navigation />
          <UsersPage
            tableHeaders={props.tableHeaders.usersTable}
            mockupData={props.mockups.usersTableContentData}
          />
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
