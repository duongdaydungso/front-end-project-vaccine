import React, { useMemo } from "react";
import { connect } from "react-redux";
import Table from "../table/Table";

function SymptomsList(props) {
  const tableColumns = useMemo(
    () => [
      {
        Header: "Symptom Name",
        accessor: "symptomName",
      },
      {
        Header: "Criticality",
        accessor: "Criticality",
      },
    ],
    []
  );

  const tableData = useMemo(() => [...props.list], [props.list]);

  return (
    <Table
      tableTitle="SYMPTOMS"
      tableColumns={tableColumns}
      tableData={tableData}
    />
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SymptomsList);
