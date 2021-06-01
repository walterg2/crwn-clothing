import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ children, isGoogleSignIn, ...buttonProps }) => (
  <button className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button`} { ...buttonProps }>
    {children}
  </button>
);

export default CustomButton;
