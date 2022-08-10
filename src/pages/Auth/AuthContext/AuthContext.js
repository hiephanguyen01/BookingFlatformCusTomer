import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../FireBaseSetUp/Firebase";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  ///////////////////////////////////////////////////////////////////////////////
  const facebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider);
  };
  ///////////////////////////////////////////////////////////////////////////////
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  const logOut = () => {
    signOut(auth);
  };
  useEffect(() => {
    const getInfo = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      getInfo();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{ googleSignIn, facebookSignIn, logOut, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
