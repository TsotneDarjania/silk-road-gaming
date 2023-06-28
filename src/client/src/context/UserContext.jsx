import { createContext } from "react";

const UserContext = createContext({
    userName: '',
    setUserName: () => {},
    isLogin: Boolean,
    setIsLogin: () => {}
})

export default UserContext;