import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import contactImage from '../assets/images/contact.png';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const requestBody = {
            email: email.trim(),
            password: password.trim(),
        };

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed.');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);

            toast.success('Login successful! Redirecting to home...', {
                // position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            toast.error(`Error: ${error.message}`, {
                // position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div className="relative min-h-screen bg-black">
            <div className="absolute inset-0">
                <img
                    src={contactImage}
                    alt="Contacts Background"
                    className="w-full h-full object-cover opacity-70"
                />
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-3xl bg-white shadow-2xl rounded-lg p-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
                        Welcome Back!
                    </h2>
                    <p className="text-center text-lg text-gray-600 mb-10">
                        Log in to manage your smart contacts effortlessly.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full mt-2 px-5 py-3 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full mt-2 px-5 py-3 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-4 text-white bg-black rounded-md text-xl hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                        >
                            Log In
                        </button>
                    </form>

                    <p className="mt-10 text-center text-base text-gray-600">
                        New user?{' '}
                        <a
                            href="/sign-up"
                            className="font-semibold text-black hover:underline"
                        >
                            Sign up here
                        </a>
                    </p>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default LoginPage;
