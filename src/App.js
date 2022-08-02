import { Button } from "antd";
import { Routes, Route } from "react-router-dom";

import UserAccount from "./pages/UserAccount";

import Header from "./components/Header/Header";
import FilterPage from "./pages/FilterPage/FilterPage";

import "./App.scss";
import Dao from "./pages/Dao";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/user/:id/*" element={<UserAccount />}></Route>
        <Route path="/filter" element={<FilterPage />}></Route>
        <Route path="/dao" element={<Dao />} />

      </Routes>
    </div>
  );
}

export default App;
