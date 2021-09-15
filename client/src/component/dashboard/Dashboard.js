import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { loadUser } from "../../actions/auth";
import Spinner from "../layout/Spinner";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import classes from "./Dashboard.module.css";
import DashboardAction from "./DashboardAction";
import Experience from "./Experience";
import Notify from "../ui/Notify";
const Dashboard = ({
  profile: { profile, loading },
  getCurrentProfile,
  loadUser,
  auth: { user },
}) => {
  useEffect(() => {
    getCurrentProfile();
    loadUser();
  }, [getCurrentProfile, loadUser]);

  const [showNotify, setShowNotify] = useState(false);

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
          <button
            className={classes["remove-account"]}
            onClick={() => setShowNotify(true)}
          >
            Remove my account
          </button>
          {showNotify ? <Notify onClick={() => setShowNotify(false)} /> : ""}
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
  deleteAccount: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  loadUser,
})(Dashboard);
