import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./component/layout/Mainpage";
import Login from "./component/auth/Login";
import { useEffect } from "react";
import Register from "./component/auth/Register";
import Profile from "./component/profile/Profile";
import Profiles from "./component/profile/Profiles";
import MyPost from "./component/post/MyPost";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import AddPost from "./component/post/AddPost";
import NotFound from "./component/layout/NotFound";
import dashboard from "./component/dashboard/Dashboard";
import PrivateRoute from "./component/routing/privateRoute";
//import Alert from "./component/layout/Alert";
import Layout from "./component/layout/Layout";
import CreateProfile from "./component/profile-forms/CreateProfile";
import EditProfile from "./component/profile-forms/EditProfile";
import AddExperience from "./component/profile-forms/AddExperience";
const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Route path="/" exact component={MainPage} />

          <section>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/mypost" exact component={MyPost} />
              <Route path="/addpost" exact component={AddPost} />
              <PrivateRoute path="/dashboard" exact component={dashboard} />
              <PrivateRoute
                path="/create-profile"
                exact
                component={CreateProfile}
              />
              <PrivateRoute
                path="/edit-profile"
                exact
                component={EditProfile}
              />
              <PrivateRoute
                path="/add-experience"
                exact
                component={AddExperience}
              />
              <PrivateRoute path="/profiles" exact component={Profiles} />
              <Route component={NotFound} />
            </Switch>
          </section>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
