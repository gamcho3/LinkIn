import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "../ui/input";
import classes from "./Register.module.css";
import { connect } from "react-redux";
import { register } from "../../actions/auth";

const Register = ({ register, user }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = data;

  const formHandler = (e) => {
    e.preventDefault();
    register(data);
  };

  return (
    <div className={classes.container}>
      <h1>SIGN UP</h1>
      <form onSubmit={formHandler}>
        <div className={classes.control}>
          <Input
            type="text"
            id="email"
            value={email}
            onChange={(e) =>
              setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
            }
          />
        </div>
        <div className={classes.control}>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) =>
              setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
            }
          />
        </div>
        <div className={classes.control}>
          <Input
            type="name"
            id="name"
            value={name}
            onChange={(e) =>
              setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
            }
          />
        </div>
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
  user: state.auth.user,
});

export default connect(mapStateToProps, { register })(Register);
