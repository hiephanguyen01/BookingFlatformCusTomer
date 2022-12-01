import { Skeleton } from "antd";
import React from "react";

const BannerSkeleton = () => {
  return (
    <div className="BannerSkeleton">
      <Skeleton.Button block active style={{ height: "50vh" }} />
    </div>
  );
};

export default BannerSkeleton;
