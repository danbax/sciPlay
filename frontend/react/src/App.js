import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/Home";
import { history } from "./helpers/history";

import {
MDBNavbar, MDBNavbarBrand
} from "mdbreact";


const App = () => {

  return (
    <Router history={history}>
        <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Cat facts</strong>
        </MDBNavbarBrand>
      </MDBNavbar>
        <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
          </Switch>
    </Router>
  );
};

export default App;
