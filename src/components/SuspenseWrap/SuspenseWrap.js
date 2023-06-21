import React, { Suspense } from "react";

const SuspenseWrap = ({ fallback = <></>, children }) => {
  return (
    <Suspense fallback={fallback}>
      <div>{children}</div>
    </Suspense>
  );
};

export default SuspenseWrap;
