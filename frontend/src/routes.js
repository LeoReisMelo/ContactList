import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import User from './pages/users/User';

const Routes = () =>{
    return (
        <BrowserRouter>
            <Route component={User} path="/" exact/>
        </BrowserRouter>
    );
}

export default Routes;