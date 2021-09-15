import React from "react";
import PropTypes from "prop-types";
import classes from "./ProfileAbout.module.css";

const ProfileAbout = ({ profile: { genres } }) => {
  return (
    <div className={classes["profile-about"]}>
      <h2>total skills</h2>
      <div className={classes.skills}>
        {genres.map((genre) => (
          <div key={genre} className={classes.skill}>
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
