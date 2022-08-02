import { Routes ,Route } from "react-router-dom";
import "./App.scss";
import { AuthPage } from "./pages/Auth/AuthPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/*" element={<AuthPage></AuthPage>}></Route>
        <Route />
      </Routes>
    </div>
  );
}

export default App;
