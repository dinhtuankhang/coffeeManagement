import React, { children, createContext, useContext, useState } from 'react'
export const AuthContext = createContext()
export function useAuthContext() {
    return useContext(AuthContext)
}
function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    return (
        <AuthContext.Provider value={{
            currentUser, setCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider