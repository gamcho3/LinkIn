import React from "react";
import PropTypes from "prop-types";
import classes from "./ProfileAbout.module.css";
import { Fragment } from "react";
const ProfileAbout = ({ profile: { genres } }) => {
  return (
    <div className={classes["profile-about"]}>
      <h2>total skills</h2>
      <div className={classes.skills}>
        {genres.map((genre, index) => (
          <Fragment>
            <div key={index} className={classes.skill}>
              {genre}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
