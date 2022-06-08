import React, { Component } from "react";
import { connect } from "react-redux";

import Intro from "../../components/intro/Intro";

class StartPage extends Component {
  render() {
    return <Intro />;
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

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
