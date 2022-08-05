import { Outlet } from "react-router-dom";
import { Footer } from "../../components/Footer";
import Header from "../../components/Header/Header";
export const CustomerLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer /> 
    </>
  );
};
