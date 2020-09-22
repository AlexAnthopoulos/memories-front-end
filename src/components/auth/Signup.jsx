import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import AuthService from "./auth-service";

class Signup extends Component {
  state = { username: "", password: "", email: "", isFound: false };
  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;

    this.service
      .signup(username, password, email)
      .then((response) => {
        console.log(response);
        this.setState({
          username: "",
          password: "",
          email: "",
          isFound: true,
        });
        this.props.getUser(response);
        this.props.history.push("/userprofile");
      })
      .catch((error) => console.log(error.stack));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="signup-form">
        <form className="signup-inner" onSubmit={this.handleFormSubmit}>
          <label className="inner-label">Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={(e) => this.handleChange(e)}
          />

          <label className="inner-label">Password:</label>
          <input
            name="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
          />
          <label className="inner-label">Email:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
          />

          <input type="submit" value="Signup" />
        </form>

        <p className="signup-inner">
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default withRouter(Signup);