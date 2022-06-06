import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";

import { getVaccinationByID } from "../../../services/adminService";

import "./Vaccination.scss";

import PatientsList from "../list/PatientsList";
import StaffMemberList from "../list/StaffMemberList";

function Vaccination(props) {
  const { vaccinationID } = useParams();
  const [vacData, setVacData] = useState({});

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
          <div className="patients-list">
            <PatientsList list={vacData.patientsList} />
          </div>
          <div className="staff-members-list">
            <StaffMemberList list={vacData.staffMembersList} />
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
