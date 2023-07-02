import { createContext } from "react";

const UserContext = createContext({
  userName: "",
  setUserName: () => {},
  isLogin: Boolean,
  setIsLogin: () => {},
  userAvatar: "",
  setUserAvatar: () => {},
  userRating: 0,
  setUserRating: () => {},
});

export default UserContext;
