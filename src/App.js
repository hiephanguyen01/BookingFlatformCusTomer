import "./App.scss";
import { AuthPage } from "./pages/Auth/AuthPage";
import { Routes, Route, Navigate } from "react-router-dom";
import UserAccount from "./pages/UserAccount";
import FilterPage from "./pages/FilterPage/FilterPage";
import Dao from "./pages/Dao";
import Footer from "./components/Footer/Footer";
import { CustomerLayout } from "./pages/CustomerLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Navigate to="/auth/sign-up" />} />
        <Route path="/auth/*" element={<AuthPage></AuthPage>}></Route>
        <Route path="/home" element={<CustomerLayout />}>
          <Route path="/user/:id/*" element={<UserAccount />}></Route>
          <Route path="/filter" element={<FilterPage />}></Route>
          <Route path="/dao" element={<Dao />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
