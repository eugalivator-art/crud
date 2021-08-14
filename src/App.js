import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./helper/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Course from "./components/Course";
import Create from "./components/Create";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Menu from "./components/Menu";
import Edit from "./components/Edit";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <ToastContainer />
      <Switch>
        <PrivateRoute exact path="/" component={Course} />
        <PrivateRoute exact path="/course" component={Course} />
        <PrivateRoute exact path="/create" component={Create} />
        <PrivateRoute exact path="/edit/:id" component={Edit} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
