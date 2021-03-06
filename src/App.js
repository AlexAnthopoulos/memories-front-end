import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Test from "./components/LoggedTest";
import Memory from "./components/Memory";
import UserProfile from "./components/UserProfile";
import AuthService from "./components/auth/auth-service";

import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/Protected-Route";

class App extends Component {
  state = { loggedInUser: null };

  service = new AuthService();

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then((response) => {
          this.setState({
            loggedInUser: response,
          });
        })
        .catch((err) => {
          this.setState({
            loggedInUser: false,
          });
        });
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  render() {
    document.title = "Memories";
    this.fetchUser();
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Navbar
            userInSession={this.state.loggedInUser}
            getUser={this.getTheUser}
          />
          <Switch>
            <Route path="/test" component={Test} />
            <Route path="/memories" component={Memory} />
            <Route path="/userprofile" component={UserProfile} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
            <Route exact path="/" component={Home} />

            <Route
              exact
              path="/signup"
              render={() => <Signup getUser={this.getTheUser} />}
            />
            <Route
              exact
              path="/login"
              render={() => <Login getUser={this.getTheUser} />}
            />

            <ProtectedRoute path="/memories" component={Memory} />
            <ProtectedRoute path="/userprofile" component={UserProfile} />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
