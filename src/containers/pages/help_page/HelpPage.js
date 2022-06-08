import React, { Component } from "react";
import { connect } from "react-redux";

import "./HelpPage.scss";

class HelpPage extends Component {
  render() {
    return (
      <div className="help-page-background">
        <div className="info-title-container">
          <div className="vaccinestation-info-container">
            Guess actions
            <div className="vaccinestation-info">View Start Page</div>
            <div className="vaccinestation-info">Login</div>
            <div className="vaccinestation-info">Sign Up</div>
          </div>
          <div className="vaccinestation-info-container">
            User actions
            <div className="vaccinestation-info">View Profile User</div>
            <div className="vaccinestation-info">View Help</div>
            <div className="vaccinestation-info">View Home Page</div>
            <div className="vaccinestation-info">View All Vaccinestation</div>
            <div className="vaccinestation-info">View All Vaccination</div>
            <div className="vaccinestation-info">+ Assign Vaccination</div>
            <div className="vaccinestation-info">+ Unassign Vaccination</div>
            <div className="vaccinestation-info">View User Diagnosis</div>
            <div className="vaccinestation-info">View All Symptoms</div>
            <div className="vaccinestation-info">Log out</div>
          </div>
          <div className="vaccinestation-info-container">
            Admin actions
            <div className="vaccinestation-info">View All Profile User</div>
            <div className="vaccinestation-info">
              View All Profile Staff Member
            </div>
            <div className="vaccinestation-info">View Help</div>
            <div className="vaccinestation-info">View Home Page</div>
            <div className="vaccinestation-info">View All Vaccinestation</div>
            <div className="vaccinestation-info">+ Add New Vaccinestation</div>
            <div className="vaccinestation-info">View All Vaccination</div>
            <div className="vaccinestation-info">+ Add New Vaccination</div>
            <div className="vaccinestation-info">+ Delete Vaccination</div>
            <div className="vaccinestation-info">+ View Vaccination Info</div>
            <div className="vaccinestation-info">
              + + Add Staff Member To Vaccination
            </div>
            <div className="vaccinestation-info">
              + + Delete Staff Member From Vaccination
            </div>
            <div className="vaccinestation-info">View All Symptoms</div>
            <div className="vaccinestation-info">Log out</div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HelpPage);
