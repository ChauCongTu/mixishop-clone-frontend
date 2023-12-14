'use client'
import LoginForm from '@/components/dashboard/login/form';
import { getLogin } from '@/modules/auth/services/getLogin';
import { LoginResponse } from '@/modules/auth/types/type';
import { useAuth } from '@/providers/auth'
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<LoginResponse>();
    const { isLoggedIn, login } = useAuth();
    const handleLogged = () => {
        redirect('/');
    }
    const handleLogin = () => {
        getLogin({ email: email, password: password })
            .then((res: LoginResponse) => {
                setUser(res);
                if (res) {
                    login(res);
                    toast.success('Đăng nhập thành công!');
                } else {
                    toast.error('Tài khoản hoặc mật khẩu không chính xác!');
                }
            })
            .catch((e) => toast.error("Tài khoản hoặc mật khẩu không chính xác!"));
    }
    return (
        <>
            {
                isLoggedIn ? handleLogged() : <LoginForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleLogin={handleLogin} />
            }
        </>
    )
}

export default Login