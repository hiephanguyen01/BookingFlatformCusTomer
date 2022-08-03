import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../FireBaseSetUp/Firebase";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  ///////////////////////////////////////////////////////////////////////////////
  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider);
  };
  ///////////////////////////////////////////////////////////////////////////////
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  const logOut = () => {
    signOut(auth);
  };
  useEffect(() => {
    const getInfo = onAuthStateChanged(auth, (currentUser) => {
     /*  console.log("User", currentUser); */
      setUser(currentUser);
    });
    return () => {
      getInfo();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ googleSignIn,facebookSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
