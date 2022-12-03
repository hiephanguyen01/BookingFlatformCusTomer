import React, { useState } from "react";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import { addLinebreaks } from "../../utils/convert";

import "./readMoreDesc.scss";

const Index = ({ title = "", children }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="wrap-read-more">
      {title && <div className="title">{title}</div>}
      {!toggle ? (
        <HTMLEllipsis
          className="see-more"
          unsafeHTML={`${addLinebreaks(children)}`}
          maxLine="5"
          trimRight={false}
          ellipsis="Xem thêm"
          basedOn="letters"
          onClick={() => setToggle(true)}
        />
      ) : (
        <p
          className="see-more"
          dangerouslySetInnerHTML={{
            __html: addLinebreaks(children),
          }}
        />
      )}
      {/* <div className={`see-more ${toggle && "active"}`}>
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
      </div> */}
    </div>
  );
};

export default Index;
