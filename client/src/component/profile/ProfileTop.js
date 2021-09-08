import React from "react";
import PropTypes from "prop-types";
import classes from "./ProfileTop.module.css";
const ProfileTop = ({ profile }) => {
  const { address, gender, user } = profile;

  return (
    <div className={classes["profile-top"]}>
      <h1>name : {user.name}</h1>
      <p>gender : {gender}</p>
      <p>address : {address}</p>
    </div>
  );
};

ProfileTop.propTypes = {};

export default ProfileTop;
