import React, { Component } from "react";
import { connect } from "react-redux";

import Intro from "../../components/intro/Intro";

class HomePage extends Component {
  render() {
    return (
      <div className="home-page-background">
        <Intro isHomePage />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
