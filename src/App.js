import { Button } from "antd";
import { Routes, Route } from "react-router-dom";

import UserAccount from "./pages/UserAccount";

import Header from "./components/Header/Header";
import FilterPage from "./pages/FilterPage/FilterPage";
import BookStudio from "./pages/BookStudio";
import DetailPost from "./pages/DetailPost";

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
        <Route path="/studio/book" element={<BookStudio />} />
        <Route path="/detailPost" element={<DetailPost />} />
      </Routes>
    </div>
  );
}

export default App;
