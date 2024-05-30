import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <span
        style={{ textAlign: "center", fontSize: "50px" }}
      >
        Page Not Found
      </span>
      <Link to='/'>
        <p>Back Home...</p>
      </Link>
    </div>
  );
};

export default NotFound;
