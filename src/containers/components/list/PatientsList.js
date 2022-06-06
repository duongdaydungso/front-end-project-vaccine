import React, { useMemo } from "react";
import { connect } from "react-redux";
import Table from "../table/Table";

function PatientsList(props) {
  const tableColumns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Date Of birth",
        accessor: "dateOfBirth",
      },
      {
        Header: "Patient Social Security Number",
        accessor: "patientSocialSecurityNumber",
      },
    ],
    []
  );

  const tableData = useMemo(() => [...props.list], [props.list]);

  const handleView = (SSN) => {
    return `/profile/${SSN}`;
  };

  return (
    <Table
      tableTitle="PATIENTS"
      tableColumns={tableColumns}
      tableData={tableData}
      tableType="patientTable"
      isView={handleView}
    />
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsList);
