import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-components';
import {
  CalculatorDemo,
  InputDemo,
  NoMatch,
  TextFieldDemo,
  Trainee,
} from './pages';
import { wrapper } from './pages/Login/index';
import { AuthRoute, PrivateRoute } from './routes/index';
import { SnackBarProvider } from './contexts';
import Apolloclient from './libs/apollo-client';

function App() {
  return (
    <div>
      <SnackBarProvider>
        <ApolloProvider client={Apolloclient}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Redirect to="/trainee" />
              </Route>
              <AuthRoute path="/login" component={wrapper} />
              <PrivateRoute path="/CalculatorDemo" component={CalculatorDemo} />
              <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
              <PrivateRoute path="/InputDemo" component={InputDemo} />
              <PrivateRoute path="/Trainee" component={Trainee} />
              <PrivateRoute component={NoMatch} />
            </Switch>
          </Router>
        </ApolloProvider>
      </SnackBarProvider>
    </div>
  );
}

export default App;
