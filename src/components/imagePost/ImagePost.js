import { Modal, Row } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";
import ModalImage from "../ModalImg";
import "./imagePost.scss";

const ImagePost = ({ data = [] }) => {
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <>
      {data.length > 0 && (
        <Row style={{ height: "100%" }}>
          <div className="image_container">
            {data?.slice(0, 5).map((item, index) => {
              return index !== 4 ? (
                <div
                  key={index}
                  onClick={() => {
                    setOpenModal(true);
                    setIndex(index);
                  }}
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
                    // dispatch({
                    //   type: "SHOW_MODAL_LIST",
                    //   Component: <ModalImage data={data} />,
                    // })
                    // setOpenModal(true)
                    {
                      setOpenModal(true);
                      setIndex(index);
                    }
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
      {openModal && (
        <Modal
          className={"modal-image"}
          style={{ borderRadius: "6px" }}
          closable={false}
          footer={null}
          maskClosable={true}
          centered
          open={openModal}
          onOk={() => setOpenModal(false)}
          onCancel={() => setOpenModal(false)}>
          <ModalImage data={data} setOpenModal={setOpenModal} index={index} />
        </Modal>
      )}
    </>
  );
};

export default memo(ImagePost);
