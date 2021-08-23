import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "../ui/input";
import classes from "./Register.module.css";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const Login = ({ login, isAuthenticated }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = data;

  const formHandler = (e) => {
    e.preventDefault();
    login(data);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={formHandler}>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) =>
            setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
        />
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) =>
            setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
        />
        <button type="submit">enter</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
