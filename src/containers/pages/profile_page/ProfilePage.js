import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Route, Switch } from "react-router-dom";

import ProfileUser from "../../components/profile/ProfileUser";
import ProfileAdmin from "../../components/profile/ProfileAdmin";

function ProfilePage(props) {
  const linkRedirect = `/profile/${props.userInfo.SSN}`;
  const userType = props.userInfo.userType;

  return (
    <Switch>
      <Route path="/profile/:profileID">
        <div className="profile-page">
          <ProfileUser userType={userType} />
        </div>
      </Route>
      <Route path="/profile">
        {userType === "admin" && <ProfileAdmin />}
        {userType !== "admin" && <Redirect to={linkRedirect} />}
      </Route>
    </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
