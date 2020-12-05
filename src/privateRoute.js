import React from 'react';
import {Route,useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';

const PrivateRoute=({component:Component, ...rest})=>{
    const history=useHistory();
    const [cookies,,]=useCookies();
    return(
        <Route
        {...rest}
        render={()=>{
            if (cookies['auth-token']){
                return <Component />
            }else{
                history.push("/login");
            }
        }}
        />
    );

}

export default PrivateRoute;