import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import MainPage from "./component/layout/Mainpage";
import Login from "./component/auth/Login";
import { Fragment, useEffect } from "react";
import Register from "./component/auth/Register";
import Profile from "./component/profile/Profile";
import MyPost from "./component/post/MyPost";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import AddPost from "./component/post/AddPost";
import NotFound from "./component/layout/NotFound";
import dashboard from "./component/dashboard/Dashboard";
import PrivateRoute from "./component/routing/privateRoute";
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
        <Fragment>
          <Navbar />
          <Route path="/" exact component={MainPage} />
          <section>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/mypost" exact component={MyPost} />
              <Route path="/addpost" exact component={AddPost} />
              <PrivateRoute path="/dashboard" exact component={dashboard} />
              <Route component={NotFound} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
