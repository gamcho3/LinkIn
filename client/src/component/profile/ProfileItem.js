import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./ProfileItem.module.css";
const ProfileItem = ({ profile: { user, genres } }) => {
  const history = useHistory();
  const { name, _id } = user;

  const moveLink = () => {
    history.push(`profile/${_id}`);
  };

  return (
    <div className={classes.box} onClick={moveLink}>
      <div>
        <h2>{name}</h2>
        <p></p>
      </div>
      <div>
        <p>skills</p>
        <ul>
          {genres.map((genre, idx) => (
            <li key={idx}>{genre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ProfileItem;
