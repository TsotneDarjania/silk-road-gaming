import { createContext } from "react";

const PageContext = createContext({
    requestedPage: "",
    setRequestedPage: () => {},
    isShowTransitionAnimation: false,
    setIsShowTransitionAnimation: () => {},
    warningProps: {},
    setWarningProps: () => {}
})

export default PageContext;