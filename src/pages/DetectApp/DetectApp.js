import React, { useEffect, useRef, useState } from "react";

const DetectApp = () => {
  const urlApp = "BookingStudioApp://open";
  useEffect(() => {
    if (/Android/i.test(navigator.userAgent)) {
      window.location.href = urlApp;

      window.location.href =
        "https://play.google.com/store/apps/details?id=com.vnplus.bookingstudio";
    } else if (/iPhone/i.test(navigator.userAgent)) {
      window.location.href = urlApp;

      window.location.href =
        "https://apps.apple.com/vn/app/booking-studio/id1563362722";
    }
  }, []);

  return <></>;
};

export default DetectApp;
