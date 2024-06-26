import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebaseconfig'; // Adjust path as per your project structure

export const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect (() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
