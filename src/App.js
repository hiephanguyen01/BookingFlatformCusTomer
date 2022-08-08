import "./App.scss";
import { AuthPage } from "./pages/Auth/AuthPage";
import { Routes, Route, Navigate } from "react-router-dom";
import UserAccount from "./pages/UserAccount";
import BookStudio from "./pages/BookStudio";
import FilterPage from "./pages/FilterPage/FilterPage";
import Dao from "./pages/Dao";
import { CustomerLayout } from "./pages/CustomerLayout";
import { AuthContextProvider } from "./pages/Auth/AuthContext/AuthContext";
import { UserAuth } from "./pages/Auth/AuthContext/AuthContext";
import { useSelector } from "react-redux";
import { confirmPassSelector } from "./stores/selectors/PhoneNumberSelector";
function App() {
  const selector = useSelector(confirmPassSelector);
  return (
    <div className="App">
      <AuthContextProvider>
        {selector ? (
          <Routes>
          <Route path="*" element={<Navigate to="/home/dao" />} />
            <Route path="home" element={<CustomerLayout />}>
              <Route path="user/:id/*" element={<UserAccount />}></Route>
              <Route path="filter" element={<FilterPage />}></Route>
              <Route path="dao" element={<Dao />} />
              <Route path="studio/book" element={<BookStudio />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route index path="*" element={<Navigate to="/auth/sign-up" />} />
            <Route path="/auth/*" element={<AuthPage></AuthPage>}></Route>
            <Route path="home" element={<CustomerLayout />}>
              <Route path="user/:id/*" element={<UserAccount />}></Route>
              <Route path="filter" element={<FilterPage />}></Route>
              <Route path="dao" element={<Dao />} />
              <Route path="studio/book" element={<BookStudio />} />
            </Route>
          </Routes>
        )}
      </AuthContextProvider>
    </div>
  );
}
export default App;
