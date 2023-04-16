import { createContext,useContext } from "react";

export const  StoreContext = createContext(null)

export const useStore = useContext(StoreContext)


type childProps = {
    children:React.ReactNode
}

function StoreProvider({children}:childProps) {

    return(
        <StoreContext.StoreProvider
    )
}