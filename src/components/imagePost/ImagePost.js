import { Col, Row } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LightBox } from "react-lightbox-pack";

import "./imagePost.scss";

const ImagePost = ({ data }) => {
  const [toggle, setToggle] = useState(false);
  const [sIndex, setSIndex] = useState(0);
  const [activeId, setActiveId] = useState(5);
  const dispatch = useDispatch();

  const lightBoxHandler = (state, sIndex) => {
    setToggle(state);
    setSIndex(sIndex);
  };
  return (
    <>
      <Row style={{ height: "100%" }}>
        <div className="image_container h-100">
          {data.slice(0, 5).map((item, index) => {
            return index !== 4 ? (
              <div
                key={index}
                onClick={() => {
                  lightBoxHandler(true, index);
                }}
                className="image_item"
              >
                <img alt="" src={item.image} />
              </div>
            ) : (
              <div
                key={index}
                onClick={() => {
                  lightBoxHandler(true, index);
                }}
                className="image_item"
              >
                <img src={item.image} alt="as" />
                <div className="number">{data.length - 5}+</div>
              </div>
            );
          })}
        </div>
      </Row>
      <LightBox
        state={toggle}
        event={lightBoxHandler}
        data={data}
        imageWidth="100vw"
        imageHeight="100vh"
        thumbnailHeight={70}
        thumbnailWidth={100}
        setImageIndex={setSIndex}
        imageIndex={sIndex}
      />
    </>
  );
};

export default ImagePost;
