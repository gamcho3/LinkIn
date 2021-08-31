import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./Dashboard.module.css";
const Dashboard = ({
  profile: { profile, loading },
  getCurrentProfile,
  auth: { user },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>DASHBOARD</h1>
      <p>Welcome {user.name}</p>
      {profile ? (
        <Fragment>
          <div className={classes.main}>
            <table className={classes.table}>
              <thead>
                <tr>
                  <td colSpan="2">PROFIlE</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{profile.gender}</td>
                  <td>{profile.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          you not have yet profile. please add some info
          <br />
          <Link to="/create-profile">
            <button className="btn">create Profile</button>
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.prototypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
