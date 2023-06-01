import React, { useState } from "react";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import { addLinebreaks } from "../../utils/convert";

import "./readMoreDesc.scss";

const Index = ({ title = "", children }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={`wrap-read-more ${toggle && "show"}`}>
      {title && <div className="title">{title}</div>}
      {!toggle ? (
        <div className="hide-text">
          <div className="content">{children}</div>
          <div className="see-more">
            <div onClick={() => setToggle(true)}>Xem thêm</div>
          </div>
        </div>
      ) : (
        // <HTMLEllipsis
        //   className="see-more"
        //   unsafeHTML={`${children}`}
        //   maxLine="5"
        //   trimRight={false}
        //   ellipsis="Xem thêm"
        //   basedOn="letters"
        //   onClick={() => setToggle(true)}
        // />
        <div className="show-text">
          <div className="content">{children}</div>
          <div className="show-less" onClick={() => setToggle(false)}>
            Rút gọn
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
