import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const LOGIN_STATUS = {
  NONE: 0,
  PENDING: 1,
  SUCCESS: 2,
  FAILURE: 3
}

// 초기 값
const initialState = {
  googleLoginStatus: LOGIN_STATUS.NONE,
  googleLoginStatusMsg: "로그인 해주세요",
  googleLoginAccessToken: null,
  googleLoginAcessToken: null,
  ourLoginAcessToken: null
};

// 구글 로그인
export const googleLogin = createAsyncThunk(
  "login/googleLogin",
  async () => {
    let result = await (
      async () =>
        new Promise((resolve) => setTimeout(() => resolve({ data: 10 }), 500))
    )();
    return result;
  }
);

// 자체 로그인
export const ourLogin = createAsyncThunk(
  "login/ourLogin",
  async () => {

  }
)

// 로그인 슬라이스
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changeGoogleLoginStatus: (state, action) => {
      state.googleLoginStatus = action.payload.status;
      state.googleLoginStatusMsg = action.payload.statusMsg;
      console.log("aaa");
    },
    setGoogleLoginAccessToken: (state, action) => {
      state.googleLoginAccessToken = action.payload;
      console.log("aaa");
    }
  },
  extraReducers: builder => {
    builder
      // Google Login
      .addCase(googleLogin.pending, (state) => {

      })
      .addCase(googleLogin.fulfilled, (state, action) => {

      })
      .addCase(googleLogin.rejected, (state, action) => {

      })

      // Our Login
      .addCase(ourLogin.pending, (state) => {

      })
      .addCase(ourLogin.fulfilled, (state, action) => {

      })
      .addCase(ourLogin.rejected, (state, action) => {

      });
  }
});

export const { changeGoogleLoginStatus, setGoogleLoginAccessToken } = loginSlice.actions;

export const googleLoginStatusMsg = state => {
  console.log(state);
  return state.login.googleLoginStatusMsg;
}
export const googleLoginAccessToken = state => state.login.googleLoginAccessToken;

export default loginSlice.reducer;
