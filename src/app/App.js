import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Users from "./components/users";
import Main from "./components/main";
import Login from "./components/login";

function App() {
    return (
        <>
            <Navbar />
            <Route path='/' exact component={Main} />
            <Route path='/login' component={Login} />
            <Route path='/users/:userId?' component={Users} />
        </>
    );
};

export default App;
