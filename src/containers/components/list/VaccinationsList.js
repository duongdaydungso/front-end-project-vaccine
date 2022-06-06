import React, { useMemo } from "react";
import { connect } from "react-redux";
import Table from "../table/Table";

function VaccinationsList(props) {
  //   const tableColumns = useMemo(
  //     () =>
  //       arrVaccinations[0]
  //         ? Object.keys(arrVaccinations[0])
  //             .filter((key) => key !== "rating")
  //             .map((key) => {
  //               return { Header: key, accessor: key };
  //             })
  //         : [],
  //     [arrVaccinations]
  //   );

  const tableColumns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "vaccinationID",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Number",
        accessor: "limitNumber",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Vaccine Type",
        accessor: "vaccineType",
      },
    ],
    []
  );

  const tableData = useMemo(
    () => [...props.arrVaccinations],
    [props.arrVaccinations]
  );

  return (
    <Table
      tableTitle={props.tableTitle}
      tableColumns={tableColumns}
      tableData={tableData}
      tableType="vaccinationTable"
      isAdd={props.isAdd}
      isDelete={props.isDelete}
      isView={props.isView}
    />
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VaccinationsList);
