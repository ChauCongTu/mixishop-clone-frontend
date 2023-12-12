'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextProps {
    children: ReactNode;
}

interface UserProfile {
    username: string;
    email: string;
    // ... other user profile fields
}

interface AuthContextValue {
    isLoggedIn: boolean;
    profile: UserProfile | null;
    login: (profile: UserProfile) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        // Check if localStorage is available
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                setIsLoggedIn(true);
                // Fetch user profile based on the token if needed
                // For simplicity, let's assume you have a function fetchUserProfile(token)
                // const userProfile = fetchUserProfile(token);
                // setProfile(userProfile);
            }
        }
    }, []);

    const login = (userProfile: UserProfile) => {
        setIsLoggedIn(true);
        setProfile(userProfile);
        // Save user token to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', 'your_token');
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setProfile(null);
        // Remove user token from localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
    };

    const contextValue: AuthContextValue = {
        isLoggedIn,
        profile,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider };
