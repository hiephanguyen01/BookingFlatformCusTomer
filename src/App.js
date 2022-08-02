import { Button } from "antd";
import { Routes, Route } from "react-router-dom";
import FilterPage from "./pages/FilterPage/FilterPage";
import "./App.scss";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route
          path="/auth"
          element={
            <p style={{ fontSize: "100px" }}>KAJSHKjahskJAHSKjahs</p>
          }></Route>
        <Route path="/filter" element={<FilterPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
