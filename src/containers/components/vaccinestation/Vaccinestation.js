import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";

import { getVaccinestationByID } from "../../../services/userService";

import "./Vaccinestation.scss";

function Vaccinestation(props) {
  const { vaccinestationID } = useParams();
  const [vaccinestationData, setvacinestationData] = useState({});

  const fetchData = async () => {
    const res = await getVaccinestationByID(vaccinestationID).catch((err) =>
      console.log(err)
    );

    if (res && res.error === 0) {
      const tempData = res.data;

      setvacinestationData(tempData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="vaccinestation-container">
      {vaccinestationData.vaccineStationId && (
        <div className="vaccinestation-content">
          <div className="info-title-container">
            <div className="info-container-child">
              <div className="info-title">Vaccinestation ID</div>
              <div className="info-data">
                {vaccinestationData.vaccineStationId}
              </div>
            </div>
            <div className="info-container-child">
              <div className="info-title">Name</div>
              <div className="info-data">{vaccinestationData.name}</div>
            </div>
            <div className="info-container-child">
              <div className="info-title">Phone</div>
              <div className="info-data">{vaccinestationData.phone}</div>
            </div>
            <div className="info-container-child">
              <div className="info-title">Address</div>
              <div className="info-data">{vaccinestationData.address}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Vaccinestation);
