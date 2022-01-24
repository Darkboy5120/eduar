import React from "react";
import "./styles.css";

const DocumentContainer = ({children}) => {
  return (
    <div className="container">{children}</div>
  );
};

export default DocumentContainer;