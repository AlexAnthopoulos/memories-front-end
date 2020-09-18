import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "./auth/auth-service";

class Navbar extends Component {
  state = { loggedInUser: null };
  service = new AuthService();

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  logoutUser = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);
    });
  };

  render() {
    if (this.state.loggedInUser) {
      return (
        <nav className="nav-style">
          <ul>
            <li>Welcome, {this.state.loggedInUser.username}</li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <Link to="/">
              <button onClick={() => this.logoutUser()}>Logout</button>
            </Link>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav className="nav-style">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      );
    }
  }
}

export default Navbar;
