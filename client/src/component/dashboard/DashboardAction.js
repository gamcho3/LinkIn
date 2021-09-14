import React from "react";
import classes from "./DashboardAction.module.css";
import { Link } from "react-router-dom";
const DashboardAction = () => {
  return (
    <div>
      <Link className={classes.link} to="/create-profile">
        <i className="fas fa-user-circle text-primary" /> Edit Profile
      </Link>
      <Link className={classes.link} to="/add-experience">
        <i className="fas fa-user-circle text-primary" /> add Experience
      </Link>
    </div>
  );
};

export default DashboardAction;
