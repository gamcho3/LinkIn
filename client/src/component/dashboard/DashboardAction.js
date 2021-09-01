import React from "react";
import classes from "./DashboardAction.module.css";
import { Link } from "react-router-dom";
const DashboardAction = () => {
  return (
    <div>
      <Link className={classes.link}>
        <i className="fas fa-user-circle text-primary" to="/edit-profile" />{" "}
        Edit Profile
      </Link>
      <Link className={classes.link}>
        <i className="fas fa-user-circle text-primary" to="/add-experience" />{" "}
        add Experience
      </Link>
    </div>
  );
};

export default DashboardAction;
