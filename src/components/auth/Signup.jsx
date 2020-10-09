import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
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
        <div className="signup-inner">
          <form onSubmit={this.handleFormSubmit}>
            <label className="inner-label">Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => this.handleChange(e)}
              className="form-control"
              required
            />

            <label className="inner-label mt-2">Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={(e) => this.handleChange(e)}
              className="form-control"
              required
            />
            <label className="inner-label mt-2">Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={(e) => this.handleChange(e)}
              className="form-control"
              required
            />

            <div className="row mt-4">
              <div className="col-4">
                <input
                  type="submit"
                  value="Signup"
                  className="btn btn-primary"
                />
              </div>
              <div className="col-8 text-white text-right">
                <p className="mb-0 mt-1">
                  Already have account?
                  <Link to={"/login"}> Login</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
