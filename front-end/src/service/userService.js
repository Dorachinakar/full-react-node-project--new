import httpService, { setCommonHeader } from "../service/httpService";
import jwtDecode from "jwt-decode";
const TOKEN_KEY = "token";
setTokenHeader();
function setTokenHeader() {
  httpService.setCommonHeader("x-access-token", getJWT());
}
export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

export function createUser(user) {
  return httpService.post("/user/register", user);
}

export async function loginUser(credentials) {
  const { data } = await httpService.post("/user/login", credentials);
  localStorage.setItem(TOKEN_KEY, data);
  setTokenHeader();
}
export function logOutUser() {
  localStorage.removeItem(TOKEN_KEY);
  setCommonHeader();
}

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

const usersService = {
  getJWT,
  createUser,
  loginUser,
  logOutUser,
  getUser,
};

export default usersService;
