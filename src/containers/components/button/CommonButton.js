import React from "react";

import "./CommonButton.scss";

function CommonButton(props) {
  return (
    <div className="common-button" onClick={props.onClick}>
      {props.text}
    </div>
  );
}

export default CommonButton;
