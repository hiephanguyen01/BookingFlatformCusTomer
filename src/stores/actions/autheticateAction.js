import { notification } from "antd";
import axios from "axios";
import { authenticateService } from "../../services/AuthenticateService";
import {
  AUTHING,
  PHONE,
  PROVIDER_ID,
  SET_LOADING,
  SET_SOCKET,
  SET_USER,
} from "../types/authType";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  FacebookAuthProvider,
} from "firebase/auth";
import firebase from "../../pages/Auth/FireBaseSetUp/Firebase";

import { auth } from "../../pages/Auth/FireBaseSetUp/Firebase";
import { userService } from "../../services/UserService";
import toastMessage from "../../components/ToastMessage";
import { io } from "socket.io-client";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};
export const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description,
  });
};
const configureCaptcha = () => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "sign-in-button",
    {
      size: "invisible",
      callback: (response) => {
        handleSendOtp();
      },
      defaultCountry: "VN",
    }
  );
};

export const facebookSignIn = (navigate) => async (dispatch) => {
  const provider = new FacebookAuthProvider();
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const res = await signInWithPopup(auth, provider);
    const resp = await authenticateService.authenticate({
      ...res["_tokenResponse"],
      providerId: res["_tokenResponse"].providerId,
    });

    localStorage.setItem("access_token", resp.data.token);
    setAuthToken(resp.data.token);
    dispatch({ type: SET_USER, payload: resp.data.data });
    dispatch({ type: PROVIDER_ID, payload: resp.data.providerId });
  } catch (error) {
    if (error.code === "auth/account-exists-with-different-credential") {
      const respError = await authenticateService.authenticate({
        ...error.customData["_tokenResponse"],
        providerId: error.customData["_tokenResponse"].providerId,
      });
      localStorage.setItem("access_token", respError.data.token);
      setAuthToken(respError.data.token);
      dispatch({ type: SET_USER, payload: respError.data.data });
      dispatch({ type: PROVIDER_ID, payload: respError.data.providerId });
    } else {
      openNotificationWithIcon(
        "error",
        "Đăng nhập thất bại!",
        "Vui lòng thử lại!"
      );
    }
  }
  dispatch({ type: SET_LOADING, payload: false });
};

export const googleSignIn = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const res = await signInWithPopup(auth, provider);
    const resp = await authenticateService.authenticate({
      ...res.user,
      ...res.user.providerData[0],
    });
    localStorage.setItem("access_token", resp.data.token);
    setAuthToken(resp.data.token);
    dispatch({ type: SET_USER, payload: resp.data.data });
    dispatch({ type: PROVIDER_ID, payload: resp.data.providerId });
  } catch (error) {
    openNotificationWithIcon(
      "error",
      "Đăng nhập thất bại",
      "Vui lòng thử lại!"
    );
  }
  dispatch({ type: SET_LOADING, payload: false });
};

export const googleLink =
  (setCheckedLink, checkedLink, phone, navigate) => async (dispatch) => {
    const provider = new GoogleAuthProvider();
    try {
      dispatch({ type: SET_LOADING, payload: true });
      let res, resp;
      if (checkedLink) {
        resp = await authenticateService.cancelSocialAccountLink({
          providerId: provider.providerId,
        });
        openNotificationWithIcon(
          "success",
          "Hủy liên kết tài khoản google thành công!"
        );
      } else {
        res = await signInWithPopup(auth, provider);
        resp = await authenticateService.socialAccountLink({
          ...res.user,
          ...res.user.providerData[0],
        });
        openNotificationWithIcon(
          "success",
          "Liên kiết tài khoản google thành công!"
        );
      }
      setCheckedLink(!checkedLink);
      dispatch({ type: SET_USER, payload: resp.data.data });
    } catch (error) {
      openNotificationWithIcon(
        "error",
        error.response.data.message,
        "Vui lòng thử lại!"
      );
      setCheckedLink(checkedLink);
    }
    dispatch({ type: SET_LOADING, payload: false });
  };

export const facebookLink =
  (setCheckedLink, checkedLink, navigate) => async (dispatch) => {
    const provider = new FacebookAuthProvider();
    try {
      dispatch({ type: SET_LOADING, payload: true });
      let res, resp;
      if (checkedLink) {
        resp = await authenticateService.cancelSocialAccountLink({
          providerId: provider.providerId,
        });
        openNotificationWithIcon(
          "success",
          "Hủy liên kết tài khoản facebook thành công!"
        );
      } else {
        res = await signInWithPopup(auth, provider);
        resp = await authenticateService.socialAccountLink({
          ...res.user,
          ...res.user.providerData[0],
        });
        openNotificationWithIcon(
          "success",
          "Liên kết tài khoản facebook thành công!"
        );
      }
      setCheckedLink(!checkedLink);
      dispatch({ type: SET_USER, payload: resp.data.data });
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        try {
          const respError = await authenticateService.socialAccountLink({
            ...error.customData["_tokenResponse"],
            providerId: error.customData["_tokenResponse"].providerId,
          });
          // console.log(respError.data);
          setCheckedLink(!checkedLink);
          dispatch({ type: SET_USER, payload: respError.data.data });
        } catch (error) {
          openNotificationWithIcon(
            "error",
            error.response.data.message,
            "Vui lòng thử lại!"
          );
        }
      } else {
        openNotificationWithIcon(
          "error",
          error.response.data.message,
          "Vui lòng thử lại!"
        );
      }
    }
    dispatch({ type: SET_LOADING, payload: false });
  };

export const handleSendOtp =
  (phoneNum, navigate, to, onClick, num, setLoading = () => {}) =>
  async (dispatch) => {
    try {
      configureCaptcha();
      const phoneNumber = "+84" + phoneNum;
      const appVerifier = window.recaptchaVerifier;
      const auth = firebase.auth();
      const res = await auth.signInWithPhoneNumber(phoneNumber, appVerifier);
      window.confirmationResult = res;
      if (onClick === undefined) {
        dispatch({ type: SET_USER, payload: phoneNumber });
        navigate(to);
      } else {
        onClick(num);
      }
    } catch (error) {
      openNotificationWithIcon("error", "Something fail", "please try again");
      setLoading(false);
    }
    dispatch({ type: SET_LOADING, payload: false });
  };
export const SignUpWithPhoneNumber = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    if (data.password) {
      const resp = await authenticateService.authenticate({ ...data });
      localStorage.setItem("access_token", resp.data.token);
      setAuthToken(resp.data.token);
      dispatch({ type: SET_USER, payload: resp.data.data });
      navigate("/home");
    } else {
      dispatch({ type: PHONE, payload: data });
    }
  } catch (error) {
    openNotificationWithIcon("error", "Somthing fail", "please try again");
  }
  dispatch({ type: SET_LOADING, payload: false });
};
export const LoginWithPhoneNumber = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const resp = await authenticateService.loginByPhoneNumber(data);
    localStorage.setItem("access_token", resp.data.token);
    localStorage.removeItem("providerId");
    setAuthToken(resp.data.token);
    dispatch({ type: SET_USER, payload: resp.data.data });
  } catch (error) {
    console.log(error);
    openNotificationWithIcon("error", "Somthing fail", "please try again");
  }
  dispatch({ type: SET_LOADING, payload: false });
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const res = await authenticateService.authenticate(data);
    setAuthToken(res.data.token);
    dispatch({ type: SET_USER, payload: res.data.user });
    localStorage.setItem("access_token", res.data.token);
  } catch (error) {
    openNotificationWithIcon(
      "error",
      "Đăng nhập thấy bại!",
      "Vui lòng thử lại!"
    );
  }
  dispatch({ type: SET_LOADING, payload: false });
};
export const changePassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });

    const res = await authenticateService.updateData(data);
    dispatch({ type: SET_USER, payload: null });
    localStorage.removeItem("access_token", res.data.token);
  } catch (error) {
    openNotificationWithIcon(
      "error",
      "Change password fail",
      "please try again"
    );
  }
  dispatch({ type: SET_LOADING, payload: false });
};
export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch({ type: AUTHING, payload: true });
    if (localStorage.getItem("access_token")) {
      const res = await authenticateService.me();
      dispatch({ type: SET_USER, payload: res.data.user });
    }
  } catch (error) {
    localStorage.removeItem("access_token");
    setAuthToken(false);
  }
  dispatch({ type: AUTHING, payload: false });
};

export const logOut = (navigate) => async (dispatch) => {
  try {
    await authenticateService.logout();
    signOut(auth);
    navigate("/auth/sign-in");
    setAuthToken(null);
    dispatch({ type: SET_USER, payload: null });
    localStorage.removeItem("access_token");
  } catch (error) {
    console.log(error);
  }
};

export const deleteMe = (navigate) => async (dispatch) => {
  try {
    await userService.deleteMe();
    signOut(auth);
    navigate("/auth/sign-in");
    setAuthToken(null);
    dispatch({ type: SET_USER, payload: null });
    localStorage.removeItem("access_token");
  } catch (error) {
    console.log(error);
    toastMessage(error.response.data.message, "error");
  }
};

export const setupSocket = () => (dispatch) => {
  const newSocket = io(process.env.REACT_APP_DB_BASE_URL + "/");
  console.log("🚀 ~ setupSocket ~ newSocket:", newSocket);
  newSocket.on("disconnect", () => {
    dispatch({ type: SET_SOCKET, payload: null });
    setTimeout(setupSocket, 3000);
  });
  newSocket.on("connect", () => {
    console.log("aaaaas");
    dispatch({ type: SET_SOCKET, payload: newSocket });
  });
};
