import React from "react";
import "./Unauthorized.css";

const UnauthorizedPage = () => {
  return (
    <div className="wraper">
      <div className="full-screen-overlay">
        <div className="content-container">
          <div className="lock"></div>
          <h1 className="error-message">Access to this page is restricted</h1>
          <p className="error-solution">
            Please contact the administrator or raise a request to gain access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
