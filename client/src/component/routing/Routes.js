import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Profile from "../profile/Profile";
import Profiles from "../profile/Profiles";
import NotFound from "../layout/NotFound";
import dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/privateRoute";
import CreateProfile from "../profile-forms/CreateProfile";
import AddExperience from "../profile-forms/AddExperience";
import Posts from "../posts/Posts";
import Post from "../posts/Post";
import classes from "./Routes.module.css";
const Routes = () => {
  return (
    <section className={classes.section}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/profile/:id" exact component={Profile} />
        <Route path="/profiles" exact component={Profiles} />
        <PrivateRoute path="/dashboard" exact component={dashboard} />
        <PrivateRoute path="/create-profile" exact component={CreateProfile} />
        <PrivateRoute path="/add-experience" exact component={AddExperience} />
        <PrivateRoute path="/post" exact component={Posts} />
        <PrivateRoute path="/post/:id" exact component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
