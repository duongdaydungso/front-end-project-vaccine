import React, { useMemo } from "react";
import { connect } from "react-redux";
import Table from "../table/Table";

function DiagnosisList(props) {
  const tableColumns = useMemo(
    () => [
      {
        Header: "Symptom Name",
        accessor: "symptomName",
      },
      {
        Header: "Criticality",
        accessor: "criticality",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );

  const tableData = useMemo(() => [...props.list], [props.list]);

  return (
    <Table
      tableTitle="DIAGNOSIS"
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

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosisList);
