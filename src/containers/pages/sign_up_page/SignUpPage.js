import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./SignUpPage.scss";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { handleSignUpAPI } from "../../../services/userService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SSN: "",
      password: "",
      name: "",
      gender: "M",
      dateOfBirth: new Date(),
      userType: "user",
      errMessage: "",
      isShowPassword: false,
      resErrCode: -1,
    };
  }

  handleOnchangeInput = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  getDateString(date) {
    const yearTmp = date.getFullYear();
    const monthTmp = date.getMonth() + 1;
    const dateTmp = date.getDate();

    let yearStr = yearTmp + "";
    let monthStr = (monthTmp > 9 ? "" : "0") + monthTmp;
    let dateStr = (dateTmp > 9 ? "" : "0") + dateTmp;

    return yearStr + "-" + monthStr + "-" + dateStr;
  }

  handleSignUp = async () => {
    const res = await handleSignUpAPI(
      this.state.userType,
      this.state.name,
      this.state.password,
      this.state.SSN,
      this.state.gender,
      this.getDateString(this.state.dateOfBirth)
    ).catch((err) => console.log(err));

    this.setState({
      resErrCode: res.error,
    });

    let errCode = res.error;
    let temp = "";

    if (errCode === 10002) {
      temp = "The SSN already in use";
    } else if (errCode !== 0) {
      temp = "Sign up failed!";
    }

    this.setState({
      errMessage: temp,
    });

    if (errCode === 0) {
      alert("Sign up success!");
    }
  };

  render() {
    return (
      <div className="sign-up-background">
        <div className="sign-up-container">
          <div className="sign-up-content">
            <div className="text-guide">Create your account</div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={this.state.name}
                onChange={(event) =>
                  this.handleOnchangeInput("name", event.target.value)
                }
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Social Security Number"
                value={this.state.SSN}
                onChange={(event) =>
                  this.handleOnchangeInput("SSN", event.target.value)
                }
              />
            </div>
            <div className="form-group">
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(event) =>
                    this.handleOnchangeInput("password", event.target.value)
                  }
                />

                <div
                  className="icon-show-password"
                  onClick={() =>
                    this.handleOnchangeInput(
                      "isShowPassword",
                      !this.state.isShowPassword
                    )
                  }
                >
                  <FontAwesomeIcon
                    icon={this.state.isShowPassword ? faEyeSlash : faEye}
                  />
                </div>
              </div>
            </div>
            <select
              className="form-select"
              value={this.state.gender}
              onChange={(event) =>
                this.handleOnchangeInput("gender", event.target.value)
              }
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            <div className="date-picker-dob">
              <DatePicker
                selected={this.state.dateOfBirth}
                className="date-picker-dob-input"
                onChange={(date) =>
                  this.handleOnchangeInput("dateOfBirth", date)
                }
              />
            </div>
            <div className="sign-up-error-message">{this.state.errMessage}</div>
            <button
              className="sign-up-button"
              onClick={() => this.handleSignUp()}
            >
              Create account
            </button>
          </div>
        </div>

        {this.state.resErrCode === 0 && <Redirect to="/login" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
