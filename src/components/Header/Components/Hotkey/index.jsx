import React, { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";

import "./Hotkey.scss";
import { hotKeyService } from "../../../../services/HotkeyService";
import { useNavigate } from "react-router-dom";

const Hotkey = () => {
  const [hotKey, setHotKey] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await hotKeyService.getAllhotKey();
        const trueD = data.filter((val) => val.isVisible);
        const chunkSize = 5;
        const smallArrays = Array.from(
          { length: Math.ceil(trueD.length / chunkSize) },
          (_, i) => trueD.slice(i * chunkSize, i * chunkSize + chunkSize)
        );
        setHotKey(smallArrays);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="Hotkey">
      <Carousel
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
      >
        {hotKey?.map((smallArr, index) => (
          <div style={{ display: "flex" }} key={index}>
            {smallArr.map((val, index) => (
              <div
                key={index}
                style={{ width: "fit-content", marginRight: "20px" }}
              >
                <p
                  className="text"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/home/filter?keyString=${val.name}`)}
                >
                  {val.name}
                </p>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hotkey;
