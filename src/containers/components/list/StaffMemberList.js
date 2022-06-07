import React, { useMemo } from "react";
import { connect } from "react-redux";
import Table from "../table/Table";

function StaffMemberList(props) {
  const tableColumns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Date Of birth",
        accessor: "dateOfBirth",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Staff Member Social Security Number",
        accessor: "staffMemberSocialSecurityNumber",
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
      tableTitle="STAFF MEMBERS"
      tableColumns={tableColumns}
      tableData={tableData}
      tableType="staffmemberTable"
      isView={handleView}
      isDelete={props.isDelete}
    />
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffMemberList);
