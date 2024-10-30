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
        // Previene el comportamiento predeterminado de recargar la página al enviar el formulario
        event.preventDefault();

        try {
            // Realiza una solicitud POST a la API de autenticación
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Si la respuesta es exitosa, redirige al usuario a la página principal
            if (res.ok) {
                router.push('/');
            } else {
                // Si la respuesta no es exitosa, muestra un mensaje de error en la consola
                console.error('Error during login:', await res.json());
            }
        } catch (error) {
            // Muestra cualquier error en la consola si la solicitud falla
            console.error('Error logging in:', error);
        }
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
        </form>
    );
};

export default LoginForm;
