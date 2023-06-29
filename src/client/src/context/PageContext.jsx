import { createContext } from "react";

const PageContext = createContext({
    requestedPage: "",
    setRequestedPage: () => {},
    warningProps: {},
    setWarningProps: () => {}
})

export default PageContext;