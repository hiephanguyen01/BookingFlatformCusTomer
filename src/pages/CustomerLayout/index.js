import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Chat from "../../components/Chat/Chat";
import "./CustomerLayout.scss";
export const CustomerLayout = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (window.location.href.split("/")[4].includes("dao")) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);
  return (
    <div style={{ position: "relative" }} className="scroll-hide">
      <Chat />
      <Header />

      <Outlet />

      {visible && <Footer />}
    </div>
  );
};
