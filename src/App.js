import React, { useEffect, Suspense, useCallback } from 'react';
import "./App.css"
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./store/actions/index";

import Layout from "./hoc/Layout/Layout";
import SignOut from "./containers/SignOut/SignOut";
import Project from "./containers/Home/Project/Project";

const Login = React.lazy(() => import("./containers/Login/Login"));
const SignUp = React.lazy(() => import("./containers/SignUp/SignUp"));
const Profile = React.lazy(() => import("./containers/Profile/Profile"));
const Home = React.lazy(() => import("./containers/Home/Home"));

const App = props => {

  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const dispatch = useDispatch();
  const onTryAutoSignUp = useCallback(() => dispatch(actions.authCheckState()),[dispatch]);

  useEffect(() => {
    onTryAutoSignUp()
  },[onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path='/signup' render={() => <SignUp {...props} />} />
      <Route path='/' exact render={() => <Login {...props} />} />
    </Switch>
  )
  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/logout' component={SignOut} />
        <Route path='/editProfile' render={() => <Profile {...props} />} />
        <Route
          path="/:projectId/:projectName"
          exact
          component={Project}
        />
        <Route path='/' exact component={Home} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    )
  }
  return (
    <div className="App">
      <Layout isAuth={props.isAuthenticated}>
        <Suspense fallback={<p></p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  )
}

export default withRouter(App);
