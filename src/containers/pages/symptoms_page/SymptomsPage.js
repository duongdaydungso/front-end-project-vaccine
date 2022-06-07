import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllSymptomsData } from "../../../services/userService";

import "./SymptomsPage.scss";

import SymptomsList from "../../components/list/SymptomsList";

function SymptomsPage(props) {
  const [symptomsData, setSymptomsData] = useState([]);

  const fetchData = async () => {
    const res = await getAllSymptomsData().catch((err) => console.log(err));

    if (res && res.error === 0) {
      const tempData = res.data;

      setSymptomsData(tempData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="symptoms-page">
      {symptomsData[0] && (
        <div className="symptoms-list">
          <SymptomsList list={symptomsData} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SymptomsPage);
