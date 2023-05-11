import { Skeleton } from "antd";
import React from "react";
import "./CardSkeleton.scss";
const CarSkeleton = () => {
  return (
    <div className="CarSkeleton">
      <div>
        <Skeleton.Button
          className="image"
          block
          active
          style={{ marginBottom: "10px" }}
        />
        <Skeleton
          active
          title={false}
          paragraph={{
            rows: 1,
          }}
          style={{ padding: "10px" }}
        />
        <Skeleton
          active
          title={false}
          paragraph={{
            rows: 2,
          }}
          style={{ padding: "10px" }}
        />
        <Skeleton
          active
          title={false}
          paragraph={{
            rows: 1,
          }}
          style={{ padding: "10px" }}
        />
      </div>
    </div>
  );
};

export default CarSkeleton;
