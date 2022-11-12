import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./CustomerLayout.scss";
export const CustomerLayout = ({ children }) => {
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  return (
    <div style={{ position: "relative" }} className="scroll-hide">
      {user && <Chat />}
      <Header />
      <div style={{ minHeight: "calc(100vh - 200px)" }}>
        {children ? children : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};
