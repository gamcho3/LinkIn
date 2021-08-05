import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import MainPage from "./component/layout/Mainpage";
import Login from "./component/auth/Login";
import { Fragment } from "react";
import Register from "./component/auth/Register";
import { Provider } from "react-redux";
import store from "./store";
const App = () => {
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
