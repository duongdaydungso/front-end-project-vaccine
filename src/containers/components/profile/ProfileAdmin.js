import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  getAllPatients,
  getAllStaffMember,
} from "../../../services/adminService";

import PatientsList from "../list/PatientsList";
import StaffMemberList from "../list/StaffMemberList";

import "./Profile.scss";

function ProfileAdmin(props) {
  const [patientData, setPatientsData] = useState([]);
  const [staffMemberData, setStaffMemberData] = useState([]);

  const fetchPatientData = async () => {
    const resPatient = await getAllPatients(props.userInfo.accessToken).catch(
      (err) => console.log(err)
    );

    if (resPatient && resPatient.error === 0) {
      const tempData = resPatient.data;

      setPatientsData(tempData);
    }
  };

  const fetchStaffMemberData = async () => {
    const resStaffMember = await getAllStaffMember(
      props.userInfo.accessToken
    ).catch((err) => console.log(err));

    if (resStaffMember && resStaffMember.error === 0) {
      const tempData = resStaffMember.data;

      setStaffMemberData(tempData);
    }
  };

  useEffect(() => {
    fetchPatientData();
    fetchStaffMemberData();
  }, []);

  return (
    <div className="profile-container">
      {patientData[0] && staffMemberData[0] && (
        <div className="admin-data">
          <div className="data-list">
            <PatientsList list={patientData} />
          </div>
          <div className="data-list">
            <StaffMemberList list={staffMemberData} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAdmin);
