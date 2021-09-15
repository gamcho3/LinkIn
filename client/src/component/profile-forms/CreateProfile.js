import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "./CreateProfile.module.css";
import { createProfile } from "../../actions/profile";
import { withRouter } from "react-router-dom";
import Button from "../ui/Button";
const CreateProfile = ({ createProfile, history }) => {
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
    createProfile(formData, history);
  };

  const { genres, address, gender } = formData;

  return (
    <div className={classes.container}>
      <h1>create your porfile</h1>
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
        <Button type="sumbit" name="create" />
      </form>
    </div>
  );
};

PropTypes.CreateProfile = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
