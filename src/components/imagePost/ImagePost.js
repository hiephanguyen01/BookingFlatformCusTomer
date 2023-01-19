import { Row } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

import { IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";
import { ModalImage } from "../ModalImg";
import "./imagePost.scss";

const ImagePost = ({ data = [] }) => {
  // const [toggle, setToggle] = useState(false);
  // const [sIndex, setSIndex] = useState(0);
  // const [activeId, setActiveId] = useState(5);
  const dispatch = useDispatch();
  return (
    <>
      {data.length > 0 && (
        <Row style={{ height: "100%" }}>
          <div className="image_container">
            {data?.slice(0, 5).map((item, index) => {
              return index !== 4 ? (
                <div
                  key={index}
                  onClick={() =>
                    dispatch({
                      type: "SHOW_MODAL_LIST",
                      Component: <ModalImage data={data} />,
                    })
                  }
                  className="image_item">
                  <img
                    alt=""
                    src={`${
                      item.includes("https://drive.google.com/")
                        ? item
                        : IMG(item)
                    }`}
                  />
                </div>
              ) : (
                <div
                  key={index}
                  onClick={() =>
                    dispatch({
                      type: "SHOW_MODAL_LIST",
                      Component: <ModalImage data={data} />,
                    })
                  }
                  className={`image_item ${
                    data?.length > 5 ? "img_more" : ""
                  }`}>
                  <img
                    src={`${
                      item.includes("https://drive.google.com/")
                        ? item
                        : IMG(item)
                    }`}
                    alt=""
                    // onError={(e) => e.target.classList.add("d-none")}
                  />
                  <div className="number">
                    {data?.length - 5 > 0 ? `${data?.length - 5}+` : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </Row>
      )}
    </>
  );
};

export default ImagePost;
