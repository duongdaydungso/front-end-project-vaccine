import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import "./LoginPage.scss";

import { handleLoginAPI } from "../../../services/userService";

import * as actions from "../../../store/actions";

import UserIcon from "../../../image/user_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SSN: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleSSNOnchangeInput = (event) => {
    this.setState({
      SSN: event.target.value,
    });
  };

  handlePasswordOnchangeInput = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleShowHidePassword = (event) => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });

    try {
      await handleLoginAPI(this.state.SSN, this.state.password).then((res) => {
        let errCode = res.error;
        let temp = "";

        if (errCode === 10005) {
          temp = "Password is not correct";
        } else if (errCode !== 0) {
          temp = "This account doesn't exist";
        }

        this.setState({
          errMessage: temp,
        });

        if (res && errCode === 0) {
          this.props.userLoginSuccess(res.data);
        }
      });
    } catch (error) {
      console.log(this.error);
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <img className="login-user-icon" src={UserIcon} alt="User Icon" />
            <div className="text-guide">Login to your account</div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Social Security Number"
                value={this.state.SSN}
                onChange={(event) => this.handleSSNOnchangeInput(event)}
              />
            </div>
            <div className="form-group">
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(event) => this.handlePasswordOnchangeInput(event)}
                />

                <div
                  className="icon-show-password"
                  onClick={() => this.handleShowHidePassword()}
                >
                  <FontAwesomeIcon
                    icon={this.state.isShowPassword ? faEyeSlash : faEye}
                  />
                </div>
              </div>
            </div>
            <div className="login-error-message">{this.state.errMessage}</div>
            <button className="login-button" onClick={() => this.handleLogin()}>
              Login
            </button>
            <div className="forgot-password">
              <Link className="forgot-password-button" to="#">
                Forgot password
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
