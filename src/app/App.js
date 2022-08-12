import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Users from "./components/users";
import Main from "./components/main";
import Login from "./components/login";

function App() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path='/' exact component={Main} />
                <Route path='/login' component={Login} />
                <Route path='/users/:userId?' component={Users} />
            </Switch>
        </>
    );
};

export default App;
