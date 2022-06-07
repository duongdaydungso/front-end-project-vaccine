import React from "react";
import CommonButton from "../button/CommonButton";

import "./CommonForm.scss";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CommonForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      address: "",
      staffMemberSSN: "",
      vaccinestationID: "",
      limitNumber: "",
      date: new Date(),
      vaccineType: "",
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

  render() {
    return (
      <div className="common-form">
        <div className="form-title">{this.props.formTitle}</div>
        {this.props.formType === "addVaccinestation" && (
          <div className="common-form-content">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Vaccinestation Name"
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
                placeholder="Phone Number"
                value={this.state.phone}
                onChange={(event) =>
                  this.handleOnchangeInput("phone", event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={this.state.address}
                onChange={(event) =>
                  this.handleOnchangeInput("address", event.target.value)
                }
              />
            </div>
            <div className="common-form-submit-button">
              <CommonButton
                onClick={() =>
                  this.props.submitMethod(
                    this.state.name,
                    this.state.phone,
                    this.state.address
                  )
                }
                text="Submit"
              />
            </div>
          </div>
        )}
        {this.props.formType === "addStaff" && (
          <div className="common-form-content">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Staff member SSN you want to add"
                value={this.state.staffMemberSSN}
                onChange={(event) =>
                  this.handleOnchangeInput("staffMemberSSN", event.target.value)
                }
              />
            </div>
            <div className="common-form-submit-button">
              <CommonButton
                onClick={() =>
                  this.props.submitMethod(this.state.staffMemberSSN)
                }
                text="Submit"
              />
            </div>
          </div>
        )}
        {this.props.formType === "addVaccination" && (
          <div className="common-form-content">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Vaccinestation ID"
                value={this.state.vaccinestationID}
                onChange={(event) =>
                  this.handleOnchangeInput(
                    "vaccinestationID",
                    event.target.value
                  )
                }
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Limit number of patient"
                value={this.state.limitNumber}
                onChange={(event) =>
                  this.handleOnchangeInput("limitNumber", event.target.value)
                }
              />
            </div>
            <div className="date-picker-form">
              <DatePicker
                selected={this.state.date}
                className="date-picker-form-input"
                onChange={(date) => this.handleOnchangeInput("date", date)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Vaccine type"
                value={this.state.vaccineType}
                onChange={(event) =>
                  this.handleOnchangeInput("vaccineType", event.target.value)
                }
              />
            </div>
            <div className="common-form-submit-button">
              <CommonButton
                onClick={() =>
                  this.props.submitMethod(
                    parseInt(this.state.vaccinestationID),
                    parseInt(this.state.limitNumber),
                    this.getDateString(this.state.date),
                    this.state.vaccineType
                  )
                }
                text="Submit"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CommonForm;
