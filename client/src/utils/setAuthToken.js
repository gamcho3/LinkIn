import api from "./api";

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token; //토큰과 시크릿키 입력
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export default setAuthToken;
