import "./App.scss";
import { AuthPage } from "./pages/Auth/AuthPage";
import { Routes, Route, Navigate } from "react-router-dom";
import UserAccount from "./pages/UserAccount";
import FilterPage from "./pages/FilterPage/FilterPage";
import Dao from "./pages/Dao";
import { CustomerLayout } from "./pages/CustomerLayout";
import { AuthContextProvider } from "./pages/Auth/AuthContext/AuthContext";
import { ProtectedRouter } from "./pages/Auth/ProtectedRouter";

function App() {
  // Warning  Add <ProtectedRouter></ProtectedRouter> when create Route //
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route index path="*" element={<Navigate to="/auth/sign-up" />} />
          <Route path="/auth/*" element={<AuthPage></AuthPage>}></Route>
          <Route path="/" element={<CustomerLayout />}>
            <Route path="/user/:id/*" element={<UserAccount />}></Route>
            <Route path="/filter" element={<FilterPage />}></Route>
            <Route path="/dao" element={<Dao />} />
          </Route>
        </Routes>
       
      </AuthContextProvider>
    </div>
  );
}
  // Warning  Add <ProtectedRouter> <YourElement/> </ProtectedRouter> when create Route //
export default App;
