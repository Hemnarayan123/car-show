import React, { createContext, useContext, useState } from "react";

const Mycontext = createContext()

export function Contextprovider({ children }) {

    const [token, settoken] = useState(localStorage.getItem('token'))
    const [role, setrole] = useState(localStorage.getItem('role'))

    const localdata = (tokendata, roledata) => {
        localStorage.setItem('token', tokendata)
        localStorage.setItem('role', roledata)
        settoken(tokendata)
        setrole(roledata)
    }


    const isSignIn = !!token;
    const signout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        settoken(null)
        setrole(null)
    }



    



    return (
        <>
            <Mycontext.Provider value={{ token, role, localdata, isSignIn, signout}}>
                {children}
            </Mycontext.Provider>
        </>
    )
}

export const useData = () => {
    return useContext(Mycontext)
}