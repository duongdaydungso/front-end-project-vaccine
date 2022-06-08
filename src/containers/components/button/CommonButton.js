import React from "react";
import { Link } from "react-router-dom";

import "./CommonButton.scss";

function CommonButton(props) {
  if (!props.linkTo) {
    return (
      <div className="common-button" onClick={props.onClick}>
        {props.text}
      </div>
    );
  } else {
    return (
      <Link className="common-button-link" to={props.linkTo}>
        <div className="common-button">{props.text}</div>
      </Link>
    );
  }
}

export default CommonButton;
