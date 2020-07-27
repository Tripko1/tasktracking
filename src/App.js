import React, { Component } from 'react';

import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Layout from "./hoc/Layout/Layout";
import Login from "./containers/Login/Login";
import Home from "./containers/Home/Home";
import SignOut from "./containers/SignOut/SignOut";
import SignUp from "./containers/SignUp/SignUp";
import Profile from "./containers/Profile/Profile";

class App extends Component {

  componentWillMount() {
    this.props.onTryAutoSignUp()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/signup' component={SignUp} />
        <Route path='/' exact component={Login} />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/logout' component={SignOut} />
          <Route path='/editProfile' component={Profile} />
          <Route path='/' exact component={Home} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      )
    }
    return (
      <div>
        <Layout isAuth={this.props.isAuthenticated}>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
