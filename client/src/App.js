import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./component/layout/Mainpage";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Layout from "./component/layout/Layout";
import Routes from "./component/routing/Routes";

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
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route component={Routes} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
