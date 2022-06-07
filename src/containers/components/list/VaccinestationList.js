import React, { useMemo } from "react";
import { connect } from "react-redux";
import Table from "../table/Table";

function VaccinestationList(props) {
  const tableColumns = useMemo(
    () => [
      {
        Header: "Vaccinestation ID",
        accessor: "vaccineStationId",
      },
      {
        Header: "Name",
        accessor: "name",
      },
    ],
    []
  );

  const tableData = useMemo(() => [...props.list], [props.list]);

  const handleView = (vaccinestationID) => {
    return `/vaccinestations/${vaccinestationID}`;
  };

  return (
    <Table
      tableTitle="VACCINESTATIONS"
      tableColumns={tableColumns}
      tableData={tableData}
      tableType="vaccinestationTable"
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

export default connect(mapStateToProps, mapDispatchToProps)(VaccinestationList);
