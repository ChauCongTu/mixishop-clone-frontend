'use client'
import { fetchProfile } from '@/modules/auth/services/getProfile';
import { LoginResponse } from '@/modules/auth/types/type';
import { UserType } from '@/modules/users/types/type';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';

interface AuthContextProps {
    children: ReactNode;
}

interface AuthContextValue {
    isLoggedIn: boolean;
    profile: UserType | null;
    login: (profile: LoginResponse) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [profile, setProfile] = useState<UserType | null>(null);

    useEffect(() => {
        // Check if localStorage is available
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                setIsLoggedIn(true);
                // Fetch user profile based on the token if needed
                // For simplicity, let's assume you have a function fetchUserProfile(token)
                fetchProfile(token)
                    .then((res: UserType) => setProfile(res))
                    .catch((e) => {
                        toast.error('Invalid Operator');
                        console.log('Lỗi fetch >>>>> ' + e);
                    })
            }
        }
    }, []);

    const login = (userProfile: LoginResponse) => {
        setIsLoggedIn(true);
        setProfile(userProfile.login);
        // Save user token to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', userProfile.token);
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
