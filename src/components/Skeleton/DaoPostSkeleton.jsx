import { Skeleton } from "antd";
import React from "react";

const DaoPostSkeleton = () => {
  return (
    <div style={{ backgroundColor: "#fff", marginTop: "20px" }}>
      <Skeleton avatar active style={{ padding: "20px" }} />
      <Skeleton
        active
        paragraph={{
          rows: 3,
        }}
        style={{ padding: "20px" }}
      />
      <Skeleton.Button block active style={{ height: "50vh" }} />
    </div>
  );
};

export default DaoPostSkeleton;
