import React, { useEffect, Fragment } from "react";
import { getProfileById } from "../../actions/profile";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import classes from "./Profile.module.css";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  const params = useParams();
  useEffect(() => {
    getProfileById(params.id);
  }, [getProfileById, params.id]);

  return (
    <Fragment>
      {loading || profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className={classes.main}>
            <Link to="/profiles" className={classes.btn}>
              Back to profiles
            </Link>
            {auth.isAuthenticated && auth.user._id === profile.user._id && (
              <Link className={classes.btn} to="/edit-profile">
                Edit Profile
              </Link>
            )}
            <div className={classes["profile-grid"]}>
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className={classes["profile-exp"]}>
                <h2>profile Experience</h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map((exp, idx) => (
                      <ProfileExperience experience={exp} key={idx} />
                    ))}
                  </Fragment>
                ) : (
                  ""
                )}
              </div>
              <div className={classes["profile-other"]}>
                <h2>profile OTHER</h2>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getProfileById })(Profile);
