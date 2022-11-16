import { notification } from "antd";
import axios from "axios";
import { authenticateService } from "../../services/AuthenticateService";
import {
  AUTHING,
  PHONE,
  PROVIDER_ID,
  SET_LOADING,
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

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};
const openNotificationWithIcon = (type, message, description) => {
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
    console.log(res);
    const resp = await authenticateService.authenticate({
      ...res.user,
      ...res.user.providerData[0],
    });

    localStorage.setItem("token", resp.data.token);
    setAuthToken(resp.data.token);
    dispatch({ type: SET_USER, payload: resp.data.data });
    dispatch({ type: PROVIDER_ID, payload: resp.data.providerId });
    // navigate("/home/dao");
  } catch (error) {
    if (error.code === "auth/account-exists-with-different-credential") {
      console.log({ error }, error.customData.email);
      // const firstPopupProviderMethod = providers.find((p) =>
      //   supportedPopupSignInMethods.includes(p)
      // );
      const respError = await authenticateService.authenticate({
        ...error.customData["_tokenResponse"],
        providerId: error.customData["_tokenResponse"].providerId,
      });
      localStorage.setItem("token", respError.data.token);
      setAuthToken(respError.data.token);
      dispatch({ type: SET_USER, payload: respError.data.data });
      dispatch({ type: PROVIDER_ID, payload: respError.data.providerId });
      // navigate("/home/dao");
    } else {
      openNotificationWithIcon("error", "Login fail", "please try again");
    }
  }
  dispatch({ type: SET_LOADING, payload: false });
};

export const googleSignIn = (navigate) => async (dispatch) => {
  const provider = new GoogleAuthProvider();
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const res = await signInWithPopup(auth, provider);
    const resp = await authenticateService.authenticate({
      ...res.user,
      ...res.user.providerData[0],
    });
    localStorage.setItem("token", resp.data.token);
    setAuthToken(resp.data.token);
    dispatch({ type: SET_USER, payload: resp.data.data });
    dispatch({ type: PROVIDER_ID, payload: resp.data.providerId });
    // navigate("/home/dao");
  } catch (error) {
    openNotificationWithIcon("error", "Login fail", "please try again");
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
          "Successfully unlinked google account"
        );
      } else {
        res = await signInWithPopup(auth, provider);
        resp = await authenticateService.socialAccountLink({
          ...res.user,
          ...res.user.providerData[0],
        });
        openNotificationWithIcon(
          "success",
          "Successfully linked google account"
        );
      }

      // localStorage.setItem("token", resp.data.token);
      // setAuthToken(resp.data.token);
      setCheckedLink(!checkedLink);
      // dispatch(handleSendOtp("0934115420", navigate, "", undefined, 6));
      // dispatch(configureCaptcha());

      dispatch({ type: SET_USER, payload: resp.data.data });
    } catch (error) {
      openNotificationWithIcon(
        "error",
        error.response.data.message,
        "please try again"
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
          "Successfully unlinked facebook account"
        );
      } else {
        res = await signInWithPopup(auth, provider);
        console.log(res);
        resp = await authenticateService.socialAccountLink({
          ...res.user,
          ...res.user.providerData[0],
        });
        console.log(resp);
        openNotificationWithIcon(
          "success",
          "Successfully linked facebook account"
        );
      }
      setCheckedLink(!checkedLink);
      dispatch({ type: SET_USER, payload: resp.data.data });
    } catch (error) {
      console.log(error);
      if (error.code === "auth/account-exists-with-different-credential") {
        try {
          const respError = await authenticateService.socialAccountLink({
            ...error.customData["_tokenResponse"],
            providerId: error.customData["_tokenResponse"].providerId,
          });
          console.log(respError.data);
          setCheckedLink(!checkedLink);
          dispatch({ type: SET_USER, payload: respError.data.data });
        } catch (error) {
          openNotificationWithIcon(
            "error",
            error.response.data.message,
            "please try again"
          );
        }
      } else {
        openNotificationWithIcon(
          "error",
          error.response.data.message,
          "please try again"
        );
      }
    }
    dispatch({ type: SET_LOADING, payload: false });
  };

export const handleSendOtp =
  (phoneNum, navigate, to, onClick, num) => async (dispatch) => {
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
    }
    dispatch({ type: SET_LOADING, payload: false });
  };
export const SignUpWithPhoneNumber = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    if (data.password) {
      const resp = await authenticateService.authenticate({ ...data });
      localStorage.setItem("token", resp.data.token);
      setAuthToken(resp.data.token);
      dispatch({ type: SET_USER, payload: resp.data.data });
      navigate("/home/dao");
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
    localStorage.setItem("token", resp.data.token);
    localStorage.removeItem("providerId");
    setAuthToken(resp.data.token);
    dispatch({ type: SET_USER, payload: resp.data.data });
    navigate("/home/dao");
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
    localStorage.setItem("token", res.data.token);
  } catch (error) {
    openNotificationWithIcon("error", "Login fail", "please try again");
  }
  dispatch({ type: SET_LOADING, payload: false });
};
export const changePassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });

    const res = await authenticateService.updateData(data);
    dispatch({ type: SET_USER, payload: null });
    localStorage.removeItem("token", res.data.token);
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
    if (localStorage.getItem("token")) {
      const res = await authenticateService.me();
      dispatch({ type: SET_USER, payload: res.data.user });
    }
  } catch (error) {
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
    localStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
};
