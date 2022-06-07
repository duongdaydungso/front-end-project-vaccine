import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import {
  getAllVaccinations,
  assignPatientToVaccination,
  unassignPatientToVaccination,
} from "../../../services/userService";

import {
  deleteVaccination,
  addNewVaccination,
} from "../../../services/adminService";

import CommonButton from "../../components/button/CommonButton";
import CommonForm from "../../components/form/CommonForm";

import VaccinationsList from "../../components/list/VaccinationsList";
import Vaccination from "../../components/vaccination/Vaccination";

import "./VaccinationsPage.scss";

function VaccinationsPage(props) {
  const [arrFuture, setArrFuture] = useState([]);
  const [arrPast, setArrPast] = useState([]);
  const [arrAssigned, setArrAssigned] = useState([]);
  const [arrNotAssigned, setArrNotAssigned] = useState([]);
  const [isShowAdd, setIsShowAdd] = useState(false);

  const accessToken = props.userInfo.accessToken;

  const fetchData = async () => {
    const res = await getAllVaccinations(accessToken).catch((err) =>
      console.log(err)
    );

    if (res && res.error === 0) {
      const tempFuture = res.data.future;
      const tempPast = res.data.past;
      const tempAssigned = res.data.assigned;
      const tempNotAssigned = res.data.notAssigned;

      setArrFuture(tempFuture);
      setArrPast(tempPast);
      setArrAssigned(tempAssigned);
      setArrNotAssigned(tempNotAssigned);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currUserType = props.userInfo.userType === "admin" ? true : false;

  const handleAdminView = (vaccinationID) => {
    return `/vaccinations/${vaccinationID}`;
  };

  const handleAdminDelete = async (vaccinationID) => {
    if (
      window.confirm(
        "You want to delete vaccination with ID: " + vaccinationID + " ?"
      )
    ) {
      const res = await deleteVaccination(accessToken, vaccinationID).catch(
        (err) => console.log(err)
      );

      if (res.error === 0) {
        alert("Deleted vaccination!");
      } else {
        alert(res.error_type);
      }

      fetchData();
    }
  };

  const handleUserAdd = async (vaccinationID) => {
    const res = await assignPatientToVaccination(
      accessToken,
      vaccinationID,
      props.userInfo.SSN
    ).catch((err) => console.log(err));

    if (res.error === 0) {
      alert("Assigned vaccination!");
    } else {
      alert(res.error_type);
    }

    fetchData();
  };

  const handleUserDelete = async (vaccinationID) => {
    const res = await unassignPatientToVaccination(
      accessToken,
      vaccinationID,
      props.userInfo.SSN
    ).catch((err) => console.log(err));

    if (res.error === 0) {
      alert("Unassigned vaccination!");
    } else {
      alert(res.error_type);
    }

    fetchData();
  };

  const handleAddButton = () => {
    setIsShowAdd(!isShowAdd);
  };

  const handleAddForm = async (
    vaccinestationID,
    limitNumber,
    date,
    vaccineType
  ) => {
    const res = await addNewVaccination(
      props.userInfo.accessToken,
      vaccinestationID,
      limitNumber,
      date,
      vaccineType
    ).catch((err) => console.log(err));

    if (res && res.error === 0) {
      alert("Add new vaccination successfully!");

      fetchData();
    } else {
      alert(res.error_type);
    }
  };

  return (
    <>
      {currUserType && (
        <Switch>
          <Route path="/vaccinations/:vaccinationID">
            <Vaccination />
          </Route>
          <Route path="/vaccinations">
            <div className="vaccinations-page-background">
              {props.userInfo.userType === "admin" && (
                <div className="add-vaccination-button">
                  <CommonButton
                    onClick={handleAddButton}
                    text="Add new vaccination"
                  />
                </div>
              )}
              {isShowAdd && (
                <div className="add-vaccination-form">
                  <CommonForm
                    formType="addVaccination"
                    formTitle="Add new vaccination"
                    submitMethod={handleAddForm}
                  />
                </div>
              )}
              <div className="vaccinations-list">
                <div className="vaccinations-list-child">
                  <VaccinationsList
                    arrVaccinations={arrFuture}
                    tableTitle="FUTURE VACCINATIONS"
                    isDelete={handleAdminDelete}
                    isView={handleAdminView}
                  />
                </div>
                <div className="vaccinations-list-child">
                  <VaccinationsList
                    arrVaccinations={arrPast}
                    tableTitle="PAST VACCINATIONS"
                    isDelete={handleAdminDelete}
                    isView={handleAdminView}
                  />
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      )}
      {!currUserType && (
        <Switch>
          <Route path="/vaccinations/:vaccinationID">
            <Vaccination />
          </Route>
          <Route path="/vaccinations">
            <div className="vaccinations-page-background">
              <div className="vaccinations-list">
                <div className="vaccinations-list-child">
                  <VaccinationsList
                    arrVaccinations={arrAssigned}
                    tableTitle="ASSIGNED VACCINATIONS"
                    isDelete={handleUserDelete}
                  />
                </div>
                <div className="vaccinations-list-child">
                  <VaccinationsList
                    arrVaccinations={arrNotAssigned}
                    tableTitle="FUTURE VACCINATIONS"
                    isAdd={handleUserAdd}
                  />
                </div>
                <div className="vaccinations-list-child">
                  <VaccinationsList
                    arrVaccinations={arrPast}
                    tableTitle="PAST VACCINATIONS"
                  />
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      )}
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VaccinationsPage);
