import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getProfileData } from "../../../services/userService";

import "./DiagnosisPage.scss";

import DiagnosisList from "../../components/list/DiagnosisList";

function DiagnosisPage(props) {
  const [diagnosisData, setDiagnosisData] = useState([]);

  const fetchData = async () => {
    if (props.userInfo.userType === "user") {
      const res = await getProfileData(
        props.userInfo.accessToken,
        props.userInfo.SSN,
        props.userInfo.userType
      ).catch((err) => console.log(err));

      if (res && res.error === 0) {
        const tempData = res.data.diagnosesList;

        setDiagnosisData(tempData);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="diagnosis-page">
      {diagnosisData[0] && props.userInfo.userType === "user" && (
        <div className="diagnosis-list">
          <DiagnosisList list={diagnosisData} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosisPage);
