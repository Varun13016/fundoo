import { BrowserRouter, Route, Switch } from "react-router-dom";

import React from 'react'
import Signin from "../pages/signin/Signin";
import Signup from "../pages/signup/signup";
import DashBoard from "../pages/Dashboard/Dashboard";
import { Provider } from "react-redux";
import store from "../Redux/store";

function Router1() {
    return (
        <>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Signin} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/dashboard" component={DashBoard} />                   
                 </Switch>
            </BrowserRouter>
            </Provider>
        </>
    )
}

export default Router1;