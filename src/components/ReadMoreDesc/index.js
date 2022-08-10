import React from "react";
import "./readMoreDesc.scss";

const Index = ({ title = "", children }) => {
  return (
    <>
      {title && <div className="title">{title}</div>}
      <div
        className="see-more"
        onClick={(e) => e.target.classList.toggle("active")}
      >
        {children}
      </div>
    </>
  );
};

export default Index;
