import React from "react";
import { Card } from "../../../../../components/Card";
export const LikeFilter = ({ category }) => {
  const Layout = ({ children }) => (
    <div className="Like__Layout">{children}</div>
  );
  const ok = () => {
    return Array.apply(null, { length: 12 }).map((val, idx) => {
      return (
        <div key={idx} style={{ width: "24%", marginBottom: "10px" }}>
          <Card />
        </div>
      );
    });
  };
  return <Layout>{ok()}</Layout>;
};
