import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./CustomerLayout.scss";
export const CustomerLayout = () => {
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  const [visible, setVisible] = useState(true);
  console.log(user);
  useEffect(() => {
    if (window.location.href.split("/")[4]?.includes("dao")) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);
  return (
    <div style={{ position: "relative" }} className="scroll-hide">
      {user && <Chat />}
      <Header />
      <Outlet />
      {visible && <Footer />}
    </div>
  );
};
