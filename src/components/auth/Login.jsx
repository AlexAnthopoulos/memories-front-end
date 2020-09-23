// auth/Login.js

import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link, withRouter } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "" };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service
      .login(username, password)
      .then((response) => {
        this.setState({ username: "", password: "" });
        this.props.getUser(response);
        this.props.history.push("/userprofile");
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div id="form">
        <div id="form-inner">
          <form onSubmit={this.handleFormSubmit}>
            <label className="inner-label">Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => this.handleChange(e)}
              className="form-control"
            />
            <label className="inner-label mt-2">Password:</label>
            <input
              name="password"
              value={this.state.password}
              onChange={(e) => this.handleChange(e)}
              className="form-control"
            />

            <div className="row mt-4">
              <div className="col-4">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary"
                />
              </div>
              <div className="col-8 text-white text-right">
                <p className="inner-paragraph">
                  Don't have account?
                  <Link to={"/signup"}> Signup</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
