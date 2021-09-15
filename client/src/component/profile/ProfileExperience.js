import React from "react";
import PropTypes from "prop-types";
import classes from "./ProfileExperience.module.css";
import Moment from "react-moment";
const ProfileExperience = ({ experience: { title, from, to } }) => {
  return (
    <div className={classes["exp-list"]}>
      <h3>{title}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {to ? <Moment format="YYYY/MM/DD">{to}</Moment> : "NOW"}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
