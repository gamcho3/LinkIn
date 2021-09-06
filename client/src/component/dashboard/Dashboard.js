import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import classes from "./Dashboard.module.css";
import DashboardAction from "./DashboardAction";
import Experience from "./Experience";
const Dashboard = ({ profile: { profile, loading }, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className={classes.main}>
      <h1>Dashboard</h1>
      <p>Welcome, {profile.user.name}</p>
      {profile ? (
        <Fragment>
          <DashboardAction />
          <Experience experience={profile.experience} />
        </Fragment>
      ) : (
        <Fragment>
          you not have yet profile. please add some info
          <br />
          <Link to="/create-profile">
            <Button type="button" name="create profile" />
          </Link>
        </Fragment>
      )}
    </div>
  );
};

Dashboard.prototypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
