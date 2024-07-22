import  { createContext, ReactNode, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client"

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
};

type AppContextType = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIN:boolean
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [toast,setToast]=useState<ToastMessage | undefined >(undefined)
    const {isError}=useQuery("validateToken",apiClient.validateToken,{
        retry:false,

    })
    const showToast = (toastMessage: ToastMessage) => {
        // Implement the showToast functionality here
        setToast(toastMessage)
    };


    return (
        <AppContext.Provider value={{ showToast,isLoggedIN:!isError }}>
            {toast &&  <Toast message={toast.message} type={toast.type} onClose={()=>setToast(undefined)}/>}
            
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};
