"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    // Maneja el envío del formulario de inicio de sesión
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                router.push('/');
            } else {
                console.error('Error during login:', await res.json());
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    // Redirige al usuario a la página de registro (en caso de tenerla)
    const handleSignUpRedirect = () => {
        router.push('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1>Sign In</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className={styles.input}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className={styles.input}
            />
            <button type="submit" className={styles.button}>Let&#39;s go</button>

            <p className={styles.signUpText}>
                Don&apos;t have an account? <a onClick={handleSignUpRedirect} className={styles.signUpLink}>Sign Up</a>
            </p>
        </form>
    );
};

export default LoginForm;
