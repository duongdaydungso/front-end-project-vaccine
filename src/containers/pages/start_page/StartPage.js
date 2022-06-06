import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { path } from "../../../utils/constants";

class StartPage extends Component {
  render() {
    const { isLoggedIn } = this.props;

    let linkToRedirect = isLoggedIn ? path.HOME_PAGE : path.LOGIN_PAGE;

    return <Redirect to={linkToRedirect} />;
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
