import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { changeGoogleLoginStatus, googleLoginAccessToken, googleLoginStatusMsg, LOGIN_STATUS, setGoogleLoginAccessToken } from "./loginSlice";

export function Login() {
  const dispatch = useDispatch();

  const googleStatusMsg = useSelector(googleLoginStatusMsg, shallowEqual);
  const googleAccessToken = useSelector(googleLoginAccessToken, shallowEqual);

  // AcessToken 검사
  const url = new URL(window.location.href);
  const hash = url.hash;

  if (hash) {
    const accessToken = hash.split("=")[1].split("&")[0];
    dispatch(setGoogleLoginAccessToken(accessToken));
    dispatch(changeGoogleLoginStatus({ status: LOGIN_STATUS.SUCCESS, statusMsg: "구글 로그인 완료되었습니다." }));
  }

  return (
    <div>
      <div>Google Login</div>

      <div>{googleStatusMsg}</div>
      <div>{googleAccessToken}</div>
      <span
        onClick={() => {
          dispatch(changeGoogleLoginStatus({ status: LOGIN_STATUS.PENDING, statusMsg: "구글 로그인이 진행 중입니다." }));
        }}
      >
        <GoogleOAuthProvider clientId='1092492613554-no95r4t1v94r8crj35n6fcd7ukmff8lb.apps.googleusercontent.com'>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              window.location.assign(`http://localhost:3000/redirect#access_token=${credentialResponse.clientId}&token_type=Bearer&expires_in=3599&scope=email%20https://www.googleapis.com/auth/userinfo.email%20openid&authuser=0&prompt=consent`);
              dispatch(changeGoogleLoginStatus({ status: LOGIN_STATUS.FAILURE, statusMsg: "구글 로그인 완료되었습니다." }));
            }}
            onError={() => {
              dispatch(changeGoogleLoginStatus({ status: LOGIN_STATUS.SUCCESS, statusMsg: "구글 로그인 실패했습니다." }));
            }}
          />
        </GoogleOAuthProvider>
      </span>
    </div>
  );
}
