import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { getProfileData } from "../../../services/userService";
import { getUserTypeBySSN } from "../../../services/adminService";

import "./Profile.scss";

function ProfileUser(props) {
  const { profileID } = useParams();

  const [userType, setUserType] = useState(props.userInfo.userType);
  const [profileData, setProfileData] = useState({});

  const fetchUserType = async () => {
    const res = await getUserTypeBySSN(
      props.userInfo.accessToken,
      profileID
    ).catch((err) => console.log(err));

    if (res && res.error === 0) {
      const tempData = res.data;

      if (tempData === "staff member") {
        setUserType("staffmember");
      } else {
        setUserType(tempData);
      }
    }
  };

  if (userType === "admin") {
    fetchUserType();
  }

  const fetchUserData = async () => {
    if (userType === "admin") return;

    const res = await getProfileData(
      props.userInfo.accessToken,
      profileID,
      userType
    ).catch((err) => console.log(err));

    if (res && res.error === 0) {
      const tempData = res.data;

      setProfileData({ ...profileData, ...tempData });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userType]);

  return (
    <div className="profile-container">
      {profileData && userType === "user" && (
        <div className="profile-content">
          <div className="info-container">
            <div className="avatar-container"></div>
            <div className="info-child-container">
              <div className="info-title">Social Security Number</div>
              <div className="info-data">
                {profileData.patientSocialSecurityNumber}
              </div>
            </div>
            <div className="info-child-container">
              <div className="info-title">Name</div>
              <div className="info-data">{profileData.name}</div>
            </div>
            <div className="info-child-container">
              <div className="info-title">Gender</div>
              <div className="info-data">{profileData.gender}</div>
            </div>
            <div className="info-child-container">
              <div className="info-title">Date of birth</div>
              <div className="info-data">{profileData.dateOfBirth}</div>
            </div>
          </div>
        </div>
      )}

      {profileData && userType === "staffmember" && (
        <div className="profile-content">
          <div className="info-container">
            <div className="avatar-container"></div>
            <div className="info-child-container">
              <div className="info-title">Social Security Number</div>
              <div className="info-data">
                {profileData.staffMemberSocialSecurityNumber}
              </div>
            </div>
            <div className="info-child-container">
              <div className="info-title">Name</div>
              <div className="info-data">{profileData.name}</div>
            </div>
            <div className="info-child-container">
              <div className="info-title">Role</div>
              <div className="info-data">{profileData.role}</div>
            </div>
            <div className="info-child-container">
              <div className="info-title">Date of birth</div>
              <div className="info-data">{profileData.dateOfBirth}</div>
            </div>
            <div className="info-child-container">
              <div className="info-title">Phone</div>
              <div className="info-data">{profileData.phone}</div>
            </div>
          </div>
        </div>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
