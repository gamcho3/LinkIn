import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "./CreateProfile.module.css";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { withRouter } from "react-router-dom";
import Button from "../ui/Button";
const EditProfile = ({
  createProfile,
  history,
  getCurrentProfile,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    setFormData({
      genres: loading || !profile.genres ? "" : profile.genres.join(","),
      address: loading || !profile.address ? "" : profile.address,
      gender: loading || !profile.gender ? "" : profile.gender,
    });
  }, [getCurrentProfile, loading]);

  const addressRef = useRef();
  const genderRef = useRef();
  const genreRef = useRef();

  const [formData, setFormData] = useState({
    genres: "",
    address: "",
    gender: "",
  });

  const changeHandelr = () => {
    setFormData((prevData) => ({
      ...prevData,
      address: addressRef.current.value,
      gender: genderRef.current.value,
      genres: genreRef.current.value,
    }));
  };

  const formHandler = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  const { genres, address, gender } = formData;

  return (
    <div className={classes.container}>
      <h1>Create Your Porfile</h1>
      <form className={classes.form} onSubmit={formHandler}>
        <div className={classes.box}>
          <label htmlFor="gender">choose your gender: </label>
          <select
            id="gender"
            ref={genderRef}
            value={gender}
            onChange={changeHandelr}
          >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className={classes.box}>
          <label htmlFor="address">enter your address</label>
          <input
            type="text"
            id="address"
            placeholder="seoul"
            ref={addressRef}
            value={address}
            onChange={changeHandelr}
          />
        </div>
        <div className={classes.box}>
          <label htmlFor="genre">enter your favorite genre</label>
          <input
            type="text"
            id="genre"
            placeholder="horror,action..."
            ref={genreRef}
            value={genres}
            onChange={changeHandelr}
          />
        </div>
        <Button type="sumbit" name="edit" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

PropTypes.EditProfile = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
