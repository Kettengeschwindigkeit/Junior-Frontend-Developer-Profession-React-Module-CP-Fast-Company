import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import UsersList from "./components/page/usersListPage";
import Main from "./layouts/main";
import Login from "./layouts/login";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path='/' exact component={Main} />
                <Route path='/login' component={Login} />
                <Route path='/users/:userId?' component={UsersList} />
            </Switch>
        </>
    );
};

export default App;
