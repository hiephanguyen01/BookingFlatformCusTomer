import React, { useEffect, useRef, useState } from "react";

const DetectApp = () => {
  const [detectUrl, setDetectUrl] = useState("");
  const aRef = useRef(null);
  useEffect(() => {
    if (/Android/i.test(navigator.userAgent)) {
      setDetectUrl(
        "https://play.google.com/store/apps/details?id=com.vnplus.bookingstudio"
      );
    } else if (/iPhone/i.test(navigator.userAgent)) {
      setDetectUrl("https://apps.apple.com/vn/app/booking-studio/id1563362722");
    }
  }, []);

  useEffect(() => {
    aRef?.current?.click();
  }, [detectUrl]);
  return (
    <div>
      <a ref={aRef} href={detectUrl} style={{ display: "none" }}></a>
    </div>
  );
};

export default DetectApp;
