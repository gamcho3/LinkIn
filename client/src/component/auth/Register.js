import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "../ui/input";
import classes from "./Register.module.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import Button from "../ui/Button";
const Register = ({ register, isAuthenticated, setAlert }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = data;

  const formHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("wrong", "password is not match", "error");
    } else {
      register({ name, email, password });
    }
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
          name="email"
          value={email}
          onChange={(e) =>
            setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
        />

        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          min="6"
          onChange={(e) =>
            setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
        />

        <Input
          type="password"
          id="password2"
          name="password confirm"
          value={password2}
          onChange={(e) =>
            setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
        />

        <Input
          type="name"
          id="name"
          name="name"
          value={name}
          onChange={(e) =>
            setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
        />

        <div className={classes.actions}>
          <Button type="submit" name="confirm" />
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
