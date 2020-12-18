import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {
  CalculatorDemo,
  InputDemo,
  Login,
  NoMatch,
  AuthRoute,
  PrivateRoute,
  TextFieldDemo,
  Trainee,
} from './pages';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/Trainee" />
          </Route>
          <AuthRoute path="/login" component={Login} />
          <PrivateRoute path="/CalculatorDemo" component={CalculatorDemo} />
          <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
          <PrivateRoute path="/InputDemo" component={InputDemo} />
          <PrivateRoute path="/Trainee" component={Trainee} />
          <PrivateRoute component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
