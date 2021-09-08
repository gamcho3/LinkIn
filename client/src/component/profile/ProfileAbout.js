import React from "react";
import PropTypes from "prop-types";
import classes from "./ProfileAbout.module.css";
import { Fragment } from "react";
const ProfileAbout = ({ profile: { genres } }) => {
  return (
    <div className={classes["profile-about"]}>
      <h2>favorite Genre</h2>
      <div className={classes.skills}>
        {genres.map((genre, idx) => (
          <Fragment>
            <div key={idx} className={classes.skill}>
              {genre}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {};

export default ProfileAbout;
