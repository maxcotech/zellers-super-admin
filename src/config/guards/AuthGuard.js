import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdmin, isSuperAdmin } from '../helpers/auth_helpers';

const AuthGuard = ({ component: Component, redirectTo, loggedIn, currentRoute, userRole, userStore = null, ...rest }) => {
    return <Route {...rest} render={(props) => {

        let validPath = ['/logout','/login','/invalid/account'];
        if (loggedIn !== false) {
           
            if (userRole != null && (isSuperAdmin(userRole) || isAdmin(userRole))) {
                console.log('returning generic component');
                return <Component {...props} />
            } 
            else {
                if(!validPath.includes(props.location.pathname)){
                    console.log('redirecting to invalid account');
                    return <Redirect to={{pathname:"/invalid/account"}} />
                } else {
                    return <Component {...props} />
                }
            }
    
        } else {
            console.log('redirecting to login...',loggedIn);
            return <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />
        }
    }} />
}

export default AuthGuard;