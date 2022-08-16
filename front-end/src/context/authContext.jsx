import { useState } from "react";
import { useContext, createContext } from "react";
import usersService from "../service/userService";
export const authContext = createContext(null);
authContext.displayName = "auth-context";
function AuthProvider({ children }) {
  const [user, setUser] = useState(usersService.getUser);
  const refreshUser = () => {
    setUser(usersService.getUser());
  };
  const createUser = (user) => {
    return usersService.createUser(user);
  };
  const login = async (credentials) => {
    const response = await usersService.loginUser(credentials);
    refreshUser();
    return response;
  };
  const logOutUser = () => {
    usersService.logOutUser();
    refreshUser();
  };

  return (
    <authContext.Provider value={{ createUser, login, logOutUser, user }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
export const useAuth = () => {
  return useContext(authContext);
};
