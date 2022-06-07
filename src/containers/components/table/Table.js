import React from "react";

import { useTable, useSortBy, useGlobalFilter } from "react-table";

import { Link } from "react-router-dom";

import { TableFilter } from "./TableFilter";

import "./Table.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faTrash,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

function Table(props) {
  // Hooks

  const tableEditHook = (hooks) => {
    if (props.isView || props.isAdd || props.isDelete) {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: "More",
          Header: "More",
          Cell: ({ row }) => (
            <div>
              {props.isView && (
                <Link
                  to={props.isView(
                    props.tableType === "vaccinationTable"
                      ? row.values.vaccinationID
                      : props.tableType === "patientTable"
                      ? row.values.patientSocialSecurityNumber
                      : props.tableType === "staffmemberTable"
                      ? row.values.staffMemberSocialSecurityNumber
                      : row.values.vaccineStationId
                  )}
                >
                  <FontAwesomeIcon
                    className="table-edit-icon"
                    icon={faCircleInfo}
                  />
                </Link>
              )}
              {props.isAdd && (
                <FontAwesomeIcon
                  className="table-edit-icon"
                  icon={faCirclePlus}
                  onClick={() =>
                    props.isAdd(
                      props.tableType === "vaccinationTable"
                        ? row.values.vaccinationID
                        : props.tableType === "patientTable"
                        ? row.values.patientSocialSecurityNumber
                        : props.tableType === "staffmemberTable"
                        ? row.values.staffMemberSocialSecurityNumber
                        : row.values.vaccineStationId
                    )
                  }
                />
              )}
              {props.isDelete && (
                <FontAwesomeIcon
                  className="table-edit-icon"
                  icon={faTrash}
                  onClick={() =>
                    props.isDelete(
                      props.tableType === "vaccinationTable"
                        ? row.values.vaccinationID
                        : props.tableType === "patientTable"
                        ? row.values.patientSocialSecurityNumber
                        : props.tableType === "staffmemberTable"
                        ? row.values.staffMemberSocialSecurityNumber
                        : row.values.vaccineStationId
                    )
                  }
                />
              )}
            </div>
          ),
        },
      ]);
    }
  };

  // Set up table

  const tableInstance = useTable(
    {
      columns: props.tableColumns,
      data: props.tableData,
    },
    useGlobalFilter,
    useSortBy,
    tableEditHook
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  // Render

  return (
    <div className="table-container">
      {props.tableTitle && (
        <div className="table-title">
          <b>{props.tableTitle}</b>
        </div>
      )}
      <div className="table-search-bar">
        <TableFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <b>
                        {column.render("Header")}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " ▼"
                            : " ▲"
                          : ""}
                      </b>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
