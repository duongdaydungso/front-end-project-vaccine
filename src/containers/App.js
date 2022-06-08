import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { history } from "../redux";

import { path } from "../utils/constants";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginPage from "./pages/login_page/LoginPage";
import SignUpPage from "./pages/sign_up_page/SignUpPage";
import StartPage from "./pages/start_page/StartPage";
import HomePage from "./pages/home_page/HomePage";
import ProfilePage from "./pages/profile_page/ProfilePage";
import VaccinationsPage from "./pages/vaccinations_page/VaccinationsPage";
import VaccinestationsPage from "./pages/vaccinestations_page/VaccinestationsPage";
import DiagnosisPage from "./pages/diagnosis_page/DiagnosisPage";
import SymptomsPage from "./pages/symptoms_page/SymptomsPage";
import HelpPage from "./pages/help_page/HelpPage";

import "./App.scss";

class App extends React.Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();

    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Router history={history}>
        <div className="main-container">
          {this.props.isLoggedIn && <Header />}

          <div className="content-container">
            <Switch>
              <Route path={path.START_PAGE} exact component={StartPage} />
              <Route
                path={path.LOGIN_PAGE}
                component={userIsNotAuthenticated(LoginPage)}
              />
              <Route
                path={path.SIGN_UP_PAGE}
                component={userIsNotAuthenticated(SignUpPage)}
              />
              <Route
                path={path.HOME_PAGE}
                component={userIsAuthenticated(HomePage)}
              />
              <Route
                path={path.VACCINATIONS_PAGE}
                component={userIsAuthenticated(VaccinationsPage)}
              />
              <Route
                path={path.VACCINESTATIONS_PAGE}
                component={userIsAuthenticated(VaccinestationsPage)}
              />
              <Route
                path={path.PROFILE_PAGE}
                component={userIsAuthenticated(ProfilePage)}
              />
              <Route
                path={path.DIAGNOSIS_PAGE}
                component={userIsAuthenticated(DiagnosisPage)}
              />
              <Route
                path={path.SYMPTOMS_PAGE}
                component={userIsAuthenticated(SymptomsPage)}
              />
              <Route
                path={path.HELP_PAGE}
                component={userIsAuthenticated(HelpPage)}
              />
            </Switch>
          </div>

          {this.props.isLoggedIn && <Footer />}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
