import React from 'react';
import {Switch, Router, Route} from 'react-router-dom';

import SignIn from '../page/Signin';
import SignUp from '../page/SignUp';


const Routes: React.FC = () =>{
    return(
        <Switch>
            <Route path="/" exact component={SignIn}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route/>
        </Switch>
    )
}

export default Routes;