import React, { Component } from "react";
import { connect } from "react-redux";

import "./IntroPart.scss";

import CommonButton from "../button/CommonButton";

class IntroPart extends Component {
  getLinkRedirect = () => {
    if (this.props.linkActive) {
      return this.props.linkTo;
    } else {
      return "/login";
    }
  };

  render() {
    return (
      <div className="intro-part-container">
        {!this.props.rightAlign && (
          <div className="intro-part-align">
            <div className="intro-part-text-container">
              <div className="intro-part-title">{this.props.title}</div>
              <div className="intro-part-info">{this.props.children}</div>
              <div className="intro-part-button-container">
                <div className="intro-part-button">
                  <CommonButton
                    linkTo={this.getLinkRedirect}
                    text={"Go to " + this.props.title}
                  />
                </div>
              </div>
            </div>
            <img
              className="intro-part-image"
              src={this.props.image}
              alt={this.props.imageAlt}
            ></img>
          </div>
        )}
        {this.props.rightAlign && (
          <div className="intro-part-align">
            <img
              className="intro-part-image"
              src={this.props.image}
              alt={this.props.imageAlt}
            ></img>
            <div className="intro-part-text-container">
              <div className="intro-part-title">{this.props.title}</div>
              <div className="intro-part-info">{this.props.children}</div>
              <div className="intro-part-button-container">
                <div className="intro-part-button">
                  <CommonButton
                    linkTo={this.getLinkRedirect}
                    text={"Go to " + this.props.title}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(IntroPart);
