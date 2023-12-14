'use client'
import LoginForm from '@/components/dashboard/login/form';
import RegisterForm from '@/components/dashboard/register/form';
import { getLogin } from '@/modules/auth/services/getLogin';
import { getRegister } from '@/modules/auth/services/getRegister';
import { LoginResponse, RegisterType } from '@/modules/auth/types/type';
import { useAuth } from '@/providers/auth'
import React, { useState } from 'react'
import toast from 'react-hot-toast';


const Login = () => {
    const { isLoggedIn, login } = useAuth();
    const handleLogged = () => {
        window.location.href = ('/');
    }
    return (
        <>
            {
                isLoggedIn ? handleLogged() : <RegisterForm />
            }
        </>
    )
}

export default Login