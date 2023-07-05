import { Skeleton } from "antd";
import React from "react";

const BannerSkeleton = () => {
  return (
    <div className="BannerSkeleton">
      <Skeleton.Button block active style={{ height: "35vh" }} />
    </div>
  );
};

export default BannerSkeleton;
