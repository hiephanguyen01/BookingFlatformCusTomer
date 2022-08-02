import "./App.scss";

import { AuthPage } from "./pages/Auth/AuthPage";
import { Routes, Route } from "react-router-dom";
import UserAccount from "./pages/UserAccount";
import FilterPage from "./pages/FilterPage/FilterPage";
import Dao from "./pages/Dao";
import { CustomerLayout } from "./pages/CustomerLayout";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/*" element={<AuthPage></AuthPage>}></Route>

        
        <Route path="/" element={<CustomerLayout />}>
          <Route path="/user/:id/*" element={<UserAccount />}></Route>
          <Route path="/filter" element={<FilterPage />}></Route>
          <Route path="/dao" element={<Dao />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
