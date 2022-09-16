import React, { useState } from "react";
import "./readMoreDesc.scss";

const Index = ({ title = "", children }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      {title && <div className="title">{title}</div>}
      <div className={`see-more ${toggle && "active"}`}>
        {children}
        {children?.length > 600 ? (
          <div
            className={`more ${toggle && "none"}`}
            onClick={() => setToggle(true)}
          >
            Xem thêm
          </div>
        ) : (
          <></>
        )}
        {toggle && (
          <div className="see-less" onClick={() => setToggle(false)}>
            Thu gọn
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
