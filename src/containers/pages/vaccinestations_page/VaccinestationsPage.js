import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Route, Switch } from "react-router-dom";

import { getAllVaccinestationsData } from "../../../services/userService";

import { addNewVaccinestation } from "../../../services/adminService";

import "./VaccinestationsPage.scss";

import Vaccinestation from "../../components/vaccinestation/Vaccinestation";
import VaccinestationList from "../../components/list/VaccinestationList";
import CommonButton from "../../components/button/CommonButton";
import CommonForm from "../../components/form/CommonForm";

function VaccinestationPage(props) {
  const [vaccinestationsData, setVaccinestationsData] = useState([]);
  const [isShowAdd, setIsShowAdd] = useState(false);

  const fetchData = async () => {
    const res = await getAllVaccinestationsData().catch((err) =>
      console.log(err)
    );

    if (res && res.error === 0) {
      const tempData = res.data;

      setVaccinestationsData(tempData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddButton = () => {
    setIsShowAdd(!isShowAdd);
  };

  const handleAddForm = async (name, phone, address) => {
    const res = await addNewVaccinestation(
      props.userInfo.accessToken,
      name,
      phone,
      address
    ).catch((err) => console.log(err));

    if (res && res.error === 0) {
      alert("Add new vaccinestation successfully!");

      fetchData();
    } else {
      alert(res.error_type);
    }
  };

  return (
    <div className="vaccinestations-page">
      <Switch>
        <Route path="/vaccinestations/:vaccinestationID">
          <Vaccinestation />
        </Route>
        <Route path="/vaccinestations">
          {props.userInfo.userType === "admin" && (
            <div className="add-vaccinestation-button">
              <CommonButton
                onClick={handleAddButton}
                text="Add new vaccinestation"
              />
            </div>
          )}
          {isShowAdd && (
            <div className="add-vaccinestation-form">
              <CommonForm
                formType="addVaccinestation"
                formTitle="Add new vaccinestation"
                submitMethod={handleAddForm}
              />
            </div>
          )}
          {vaccinestationsData[0] && (
            <div className="vaccinestations-list">
              <VaccinestationList list={vaccinestationsData} />
            </div>
          )}
        </Route>
      </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps)(VaccinestationPage);
