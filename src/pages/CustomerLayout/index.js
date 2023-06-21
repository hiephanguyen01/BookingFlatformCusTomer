import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./CustomerLayout.scss";
import { Grid } from "antd";
import BottomNav from "../../components/BottomNav/BottomNav";
const { useBreakpoint } = Grid;
const CustomerLayout = ({ children }) => {
  const screens = useBreakpoint();
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  return (
    <div style={{ position: "relative" }} className="scroll-hide">
      {screens.xs ? <></> : user && <Chat />}
      {screens.xs ? <></> : <Header />}
      <div style={{ minHeight: "calc(100vh - 200px)", background: "#f5f5f5" }}>
        {children ? children : <Outlet />}
      </div>
      <Footer />

      {screens.xs && (
        <>
          <div className="h-40px"></div>
          <BottomNav />
        </>
      )}
    </div>
  );
};

export default CustomerLayout;
