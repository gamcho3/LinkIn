import React from "react";
import PropTypes from "prop-types";

const Login = (props) => {
  return (
    <div>
      <container>
        <form>
          <label htmlFor="email"> email</label>
          <input type="email" id="email" />
          <label htmlFor="password">password</label>
          <input type="password" id="password" />
          <button type="submit">enter</button>
        </form>
      </container>
    </div>
  );
};

Login.propTypes = {};

export default Login;
