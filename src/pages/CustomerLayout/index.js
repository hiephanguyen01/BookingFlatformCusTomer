import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import  Footer  from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./CustomerLayout.scss";
export const CustomerLayout = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.location.href.split("/")[4]?.includes("dao")) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);
<<<<<<< HEAD
  
=======
  console.log(window.location.href.split("/")[4]);

>>>>>>> 5ea6c45ae79b1b850e6bba23822387e963cbe09b
  return (
    <div style={{ position: "relative" }} className="scroll-hide">
      <Chat />
      <Header />
      <Outlet />
      {visible && <Footer />}
    </div>
  );
};
