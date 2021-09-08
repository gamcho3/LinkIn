import React from "react";
import PropTypes from "prop-types";

import Moment from "react-moment";
const ProfileExperience = ({ experience: { title, from, to } }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {to ? <Moment format="YYYY/MM/DD">{to}</Moment> : "NOW"}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {};

export default ProfileExperience;
