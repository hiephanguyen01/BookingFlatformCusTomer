import React, { useState } from "react";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import { addLinebreaks } from "../../utils/convert";

import "./readMoreDesc.scss";

const Index = ({ title = "", children }) => {
  const [toggle, setToggle] = useState(false);
  console.log(addLinebreaks(children));
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
        <div className="see-more">
          <p
            className="content"
            dangerouslySetInnerHTML={{
              __html: addLinebreaks(children),
            }}
          />
          <div className="show-less" onClick={() => setToggle(false)}>
            Rút gọn
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
