import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import "./customArrowSwiper.scss";
export const CustomRightArrowSwiper = () => {
  return (
    <div className="arrow">
      <RightOutlined style={{ fontSize: "10px", color: "#616161" }} />
    </div>
  );
};

export const CustomLeftArrowSwiper = () => {
  return (
    <div className="arrow">
      <LeftOutlined style={{ fontSize: "10px", color: "#616161" }} />
    </div>
  );
};
