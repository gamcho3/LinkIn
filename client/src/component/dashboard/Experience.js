import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Fragment } from "react";
import classes from "./Experience.module.css";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  const deleteHandler = (id) => {
    deleteExperience(id);
  };

  const experiences = experience.map((exp) => (
    <tr
      key={exp._id}
      className={classes.row}
      onClick={() => deleteHandler(exp._id)}
    >
      <td>{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
        <i className="far fa-window-close"></i>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2>experience Credential</h2>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>title</th>
            <th className={classes.th}>year</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
