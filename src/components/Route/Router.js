import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ModulesSideBar from '../modules-side-bar/ModulesSideBar';
import App from '../../App'
import Admin from '../Admin/Admin'
import Login from '../login/Login';
import Register from '../Register/Register';
import ForgotPassword from '../forgot/ForgotPassword';


const Router = () => (
 <BrowserRouter>
   <Switch>
    <Route exact path='/' component={App} />
    <Route exact path='/admin/login' component={Login} />
    <Route exact path='/admin/register' component={Register} />
    <Route exact path='/admin/reset' component={ForgotPassword} />
    /admin
    <Route exact path='/admin' component={Admin} />
   </Switch>
 </BrowserRouter>

 );

export default Router;
