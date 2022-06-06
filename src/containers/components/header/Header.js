import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../../store/actions";

import { path } from "../../../utils/constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRightFromBracket,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import "./Header.scss";
import { headerPageList } from "./headerPageList";
import { sideBarPageList } from "./sideBarPageList";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySideBar: false,
    };
  }

  handleClickSideBar = () => {
    this.setState({
      displaySideBar: !this.state.displaySideBar,
    });
  };

  render() {
    const { processLogout } = this.props;

    return (
      <div className="header-container">
        <div className="header-content">
          <div className="left-content">
            <div className="menu-icon" onClick={this.handleClickSideBar}>
              <FontAwesomeIcon className="menu-icon-img" icon={faBars} />
            </div>
            <Link className="header-logo" to={path.HOME_PAGE} />
          </div>
          <div className="center-content">
            {headerPageList.map((item, index) => {
              return (
                <Link
                  className="center-child-content"
                  key={index}
                  to={item.link}
                >
                  <div className="center-child-content-text">
                    <b>{item.title}</b>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="right-content">
            <div className="btn button-logout" onClick={processLogout}>
              <div className="button-logout-text">Log out</div>
              <FontAwesomeIcon
                className="button-logout-icon"
                icon={faRightFromBracket}
              />
            </div>
          </div>
        </div>

        {this.state.displaySideBar && (
          <div className="side-bar-content">
            <div
              className="side-bar-close-button"
              onClick={this.handleClickSideBar}
            >
              <FontAwesomeIcon
                className="side-bar-close-button-img"
                icon={faCircleXmark}
              />
            </div>
            {sideBarPageList.map((item, index) => {
              return (
                <div className="side-bar-child-content" key={index}>
                  <Link className="side-bar-child-content-link" to={item.link}>
                    <div className="side-bar-child-content-text">
                      {item.title}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
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
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
