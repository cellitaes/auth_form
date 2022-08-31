import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Form from "./pages/Form";
import Welcome from "./pages/Welcome";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <Welcome />
        </Route>
        <Route path="/register" exact>
          <Form />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
