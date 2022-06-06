import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { footerList } from "./footerList";
import "./Footer.scss";

class Footer extends Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    return (
      <div className="footer-container">
        <div className="footer-content">
          {footerList.map((columnItem, columnIndex) => {
            return (
              <div className="footer-column" key={columnIndex}>
                <div className="footer-column-title">
                  <b>{columnItem.title}</b>
                </div>
                {columnItem.child.map((childItem, childIndex) => {
                  return (
                    <div className="footer-child" key={childIndex}>
                      {childItem.icon && (
                        <FontAwesomeIcon
                          className="footer-child-icon"
                          icon={childItem.icon}
                        />
                      )}
                      <Link className="footer-child-link" to="#">
                        {childItem.childTitle}
                      </Link>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
