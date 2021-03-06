import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './Helpers';

const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                props => isAuth() && isAuth().role === "admin"
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: '/signin', state: { from: props.location.pathname } }} />
            }
        />
    );
};

export default AdminRoute;