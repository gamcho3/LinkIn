import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "../ui/input";
import classes from "./Register.module.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
//import { setAlert } from "../../actions/alert";
//import { VALIDATOR_REQUIRE } from "../../actions/validator";
//import { validate } from "../../actions/valid";
const Register = ({ register, isAuthenticated }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = data;

  const formHandler = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.container}>
      <h1>SIGN UP</h1>
      <form onSubmit={formHandler}>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) =>
            setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
        />

        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) =>
            setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
        />

        <Input
          type="password"
          id="password2"
          value={password2}
          onChange={(e) =>
            setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
        />

        <Input
          type="name"
          id="name"
          value={name}
          onChange={(e) =>
            setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
        />

        <div className={classes.actions}>
          <button type="submit">confirm</button>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
