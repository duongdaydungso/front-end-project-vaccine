import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";

import {
  getVaccinationByID,
  addStaffMemberToVaccination,
  deleteStaffMemberFromVaccination,
} from "../../../services/adminService";

import "./Vaccination.scss";

import PatientsList from "../list/PatientsList";
import StaffMemberList from "../list/StaffMemberList";

import CommonButton from "../button/CommonButton";
import CommonForm from "../form/CommonForm";

function Vaccination(props) {
  const { vaccinationID } = useParams();
  const [vacData, setVacData] = useState({});
  const [isShowAdd, setIsShowAdd] = useState(false);

  const fetchData = async () => {
    const res = await getVaccinationByID(
      props.userInfo.accessToken,
      vaccinationID
    ).catch((err) => console.log(err));

    if (res && res.error === 0) {
      const tempData = res.data;

      setVacData({ ...vacData, ...tempData });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteStaff = async (staffSSN) => {
    const res = await deleteStaffMemberFromVaccination(
      props.userInfo.accessToken,
      vaccinationID,
      staffSSN
    );

    if (res && res.error === 0) {
      alert("Delete successfully!");

      fetchData();
    } else {
      alert(res.error_type);
    }
  };

  const handleAddButton = () => {
    setIsShowAdd(!isShowAdd);
  };

  const handleAddForm = async (staffSSN) => {
    const res = await addStaffMemberToVaccination(
      props.userInfo.accessToken,
      vaccinationID,
      staffSSN
    ).catch((err) => console.log(err));

    if (res && res.error === 0) {
      alert("Add new staff member to vaccination successfully!");

      fetchData();
    } else {
      alert(res.error_type);
    }
  };

  return (
    <div className="vaccination-container">
      {vacData.patientsList && (
        <div className="vaccination-content">
          <div className="info-title-container">
            <div className="info-container-child">
              <div className="info-title">Vaccination ID</div>
              <div className="info-data">{vacData.vaccinationID}</div>
            </div>
            <div className="info-container-child">
              <div className="info-title">Vaccine Type</div>
              <div className="info-data">{vacData.vaccineType}</div>
            </div>
            <div className="info-container-child">
              <div className="info-title">Date</div>
              <div className="info-data">{vacData.date}</div>
            </div>
            <div className="info-container-child">
              <div className="info-title">Limit Number</div>
              <div className="info-data">{vacData.limitNumber}</div>
            </div>
            <div className="vaccinestation-info-container">
              Vaccinestation
              <div className="vaccinestation-info">
                ID: {vacData.vaccineStation.vaccineStationId}
              </div>
              <div className="vaccinestation-info">
                Name: {vacData.vaccineStation.name}
              </div>
              <div className="vaccinestation-info">
                Phone: {vacData.vaccineStation.phone}
              </div>
              <div className="vaccinestation-info">
                Address: {vacData.vaccineStation.address}
              </div>
            </div>
          </div>
          {props.userInfo.userType === "admin" && (
            <div className="add-staff-member-button">
              <CommonButton
                onClick={handleAddButton}
                text="Add new staff member to vaccination"
              />
            </div>
          )}
          {isShowAdd && (
            <div className="add-staff-member-form">
              <CommonForm
                formType="addStaff"
                formTitle="Add new vaccination"
                submitMethod={handleAddForm}
              />
            </div>
          )}
          <div className="staff-members-list">
            <StaffMemberList
              list={vacData.staffMembersList}
              isDelete={(staffSSN) => handleDeleteStaff(staffSSN)}
            />
          </div>
          <div className="patients-list">
            <PatientsList list={vacData.patientsList} />
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Vaccination);
