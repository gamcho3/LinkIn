import React, { useRef } from "react";
import Modal from "./Modal";
import classes from "./Notify.module.css";
import { deleteAccount } from "../../actions/profile";
import { connect } from "react-redux";
const Notify = ({ onClick, deleteAccount }) => {
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    deleteAccount(password);
  };

  return (
    <Modal onClick={onClick}>
      <div className={classes.content}>
        <h2>are you sure?</h2>
        <p>Enter your Password</p>
      </div>
      <form className={classes.form} onSubmit={submitHandler}>
        <input type="password" className={classes.input} ref={passwordRef} />
        <button className={classes.btn} type="submit">
          DELETE
        </button>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteAccount })(Notify);
