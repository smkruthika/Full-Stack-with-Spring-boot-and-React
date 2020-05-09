import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import LoginComponent from './LoginComponent';
import TodoListComponent from './TodoListComponent';
import WelcomeComponent from './WelcomeComponent';
import LogoutComponent from './LogoutComponent';
import ErrorComponent from './ErrorComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import TodoComponent from './TodoComponent';


class TodoApp extends Component {
    render() {
      return (
        <div>
          <Router>
            <div>
              <HeaderComponent />
              <Switch>
              <Route path="/" exact component={LoginComponent} />
              <Route path="/login" component={LoginComponent} />
              <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
              <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
              <AuthenticatedRoute path="/todos" component={TodoListComponent} />
              <AuthenticatedRoute path="/logout" component={LogoutComponent} />
              <AuthenticatedRoute component={ErrorComponent} />
              </Switch>
              <FooterComponent />
            </div>
          </Router>
        </div>
      )
    }
}

export default TodoApp;