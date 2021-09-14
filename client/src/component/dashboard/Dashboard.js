import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { loadUser } from "../../actions/auth";
import Spinner from "../layout/Spinner";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import classes from "./Dashboard.module.css";
import DashboardAction from "./DashboardAction";
import Experience from "./Experience";
const Dashboard = ({
  profile: { profile, loading },
  getCurrentProfile,
  loadUser,
  auth: { user },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
    loadUser();
  }, [getCurrentProfile, loadUser]);

  console.log(loading);
  return loading ? (
    <Spinner />
  ) : (
    <div className={classes.main}>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      {profile !== null ? (
        <Fragment>
          <DashboardAction />
          <Experience experience={profile.experience} />
          <button className={classes["remove-account"]} onClick={deleteAccount}>
            Remove my account
          </button>
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
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  loadUser,
  deleteAccount,
})(Dashboard);
