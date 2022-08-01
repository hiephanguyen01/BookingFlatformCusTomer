import { Button } from "antd";
import { Routes ,Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<p style={{fontSize:"100px"}}>KAJSHKjahskJAHSKjahs</p>}></Route>
        <Route />
      </Routes>
    </div>
  );
}

export default App;
