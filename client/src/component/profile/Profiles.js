import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Fragment } from "react";
import ProfileItem from "./ProfileItem";
import classes from "./Profiles.module.css";
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {!profiles || loading ? (
        <Spinner />
      ) : (
        <div className={classes.main}>
          <h1>USER List</h1>
          <p>Browse and connect USER</p>
          <div>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem profile={profile} key={profile._id} />
              ))
            ) : (
              <p>no user found...</p>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
