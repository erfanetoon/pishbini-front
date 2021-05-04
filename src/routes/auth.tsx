import { CircularProgress, Box } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
const Login = React.lazy(() => import('../pages/auth/login/login'));
const Forget = React.lazy(() => import('../pages/auth/forget/forget'));
const Register = React.lazy(() => import('../pages/auth/register/register'));

const AuthRoutes: React.FC = () => {
  return (
    <React.Suspense
      fallback={
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      }
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/forget" component={Forget} />
        <Route exact path="/register" component={Register} />
        <Redirect to="/login" />
      </Switch>
    </React.Suspense>
  );
};

export default AuthRoutes;
