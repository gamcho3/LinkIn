import React, { useEffect, Fragment } from "react";

import { connect } from "react-redux";
const Profile = ({ user: { name, email } }) => {
  useEffect(() => {}, []);
  return (
    <Fragment>
      <div>
        <div>
          <p>{name}</p>
        </div>
        <div>
          <p>{email}</p>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Profile);
