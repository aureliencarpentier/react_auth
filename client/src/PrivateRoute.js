import React, { useContext } from 'react';
import AuthContext from './context/auth';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
   const isAuth = useContext(AuthContext);
   console.log({ "isAuth token": isAuth.token });
   return (
      <Route
         {...rest}
         render={props =>
            isAuth.token ? <Component {...props} /> : <Redirect to="/login" />
         }
      />
   );
}

export default PrivateRoute;
