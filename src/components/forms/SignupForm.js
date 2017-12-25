import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import Loader from "react-loader"


class SignupForm  extends Component{
  state = {
      data: {
        email: "",
        username: "",
        password: ""
      },
      errors: {},
      loaded: true
    };

    onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

    onSubmit = (e) => {
      e.preventDefault();
      const errors = this.validate(this.state.data);
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        this.setState({ loaded: false });
        this.props.submit(this.state.data)
        .catch(err => {this.setState({errors: err.response.data.errors,loaded: true})}
        );
      }

    }

    validate = data => {
      const errors = {};
      if (!isEmail(data.email)) errors.email = "Invalid email";
      if (!data.password) errors.password = "Can't be blank";
      if (!data.username) errors.username = "Can't be blank";

      return errors;
    };

    render(){
      const { data, errors,loaded } = this.state;
      return(
        <Loader loaded={loaded}>
        <form onSubmit={this.onSubmit}>
          {errors.msg && (
            <div className="alert alert-danger">{errors.msg}</div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={this.onChange}
              className={
                errors.email ? "form-control is-invalid" : "form-control"
              }
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={this.onChange}
              className={
                errors.username ? "form-control is-invalid" : "form-control"
              }
            />
            <div className="invalid-feedback">{errors.username}</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={this.onChange}
              className={
                errors.password ? "form-control is-invalid" : "form-control"
              }
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>

          <small className="form-text text-center">
            or <Link to="/login">LOGIN</Link> if you have an account
          </small>
        </form>
      </Loader>
      )
    }

}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};


export default SignupForm;
