import { Button } from "antd";
import "./App.scss";
import { Home } from "./pages/Home";
import { StudioDetail } from "./pages/StudioDetail";

function App() {
  return (
    <div className="App">
      <Home/>
      <StudioDetail />
    </div>
  );
}

export default App;
