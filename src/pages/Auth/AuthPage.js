import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./AuthLayout/AuthLayout";
import { SetPassword } from "./SignUp/SetPassword/SetPassword";
import { SignUp } from "./SignUp/SignUp";
import { SignIn } from "./SignIn/SignIn";
import { SignUpWithPhone } from "./SignUp/SignUpWithPhone/SignUpWithPhone";
import { ForgotPassword } from "./SignIn/FogotPassword/ForgotPassword";
import { ProtectedRouter } from "./ProtectedRouter";
export const AuthPage = () => {
  return (
    <AuthLayout>
      <Routes>
        <Route path = "*" element={<Navigate to="sign-up"/>} />
        <Route path="sign-up" element={<SignUp></SignUp>}></Route>
        <Route
          path="sign-up/phone"
          element={
            <ProtectedRouter>
              <SignUpWithPhone
                backLink="/auth/sign-up"
                nextLink="/auth/sign-up/set-password"></SignUpWithPhone>
            </ProtectedRouter>
          }
        />
        <Route
          path="sign-up/set-password"
          element={
            <ProtectedRouter>
              <SetPassword
                backLink="/auth/sign-up/phone"
                nextLink="/"
                submit="Đăng ký"
                header="Thiết lập mật khẩu"></SetPassword>
            </ProtectedRouter>
          }
        />
        <Route path="sign-in" element={<SignIn></SignIn>} />
        <Route
          path="sign-in/forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        />
        <Route
          path="sign-in/forgot-password/phone"
          element={
            <SignUpWithPhone
              backLink="/auth/sign-in/forgot-password"
              nextLink="/auth/sign-in/forgot-password/set-password"></SignUpWithPhone>
          }
        />
        <Route
          path="sign-in/forgot-password/set-password"
          element={
            <ProtectedRouter>
              <SetPassword
                backLink="/auth/sign-in/forgot-password/phone"
                nextLink="/"
                submit="Đặt lại mật khẩu"
                header="Đặt lại mật khẩu"></SetPassword>
            </ProtectedRouter>
          }
        />
      </Routes>
    </AuthLayout>
  );
};
