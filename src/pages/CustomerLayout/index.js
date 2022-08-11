import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export const CustomerLayout = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.location.href.split("/")[4]?.includes("dao")) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);
  console.log(window.location.href.split("/")[4]);
  return (
    <div>
      <Header />
      <Outlet />
      {visible && <Footer />}
    </div>
  );
};
