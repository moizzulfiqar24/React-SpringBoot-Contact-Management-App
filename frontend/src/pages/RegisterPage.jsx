// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const RegisterPage = () => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate(); // Hook for navigation

//     const handleRegister = async (e) => {
//         e.preventDefault();

//         const requestBody = {
//             username,
//             email,
//             password,
//         };

//         try {
//             const response = await fetch('http://localhost:8080/auth/signup', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestBody),
//             });

//             if (!response.ok) {
//                 const contentType = response.headers.get('content-type');
//                 let errorMessage = `Error ${response.status}: ${response.statusText}`;

//                 if (contentType && contentType.includes('application/json')) {
//                     const errorData = await response.json();
//                     errorMessage = errorData.message || errorMessage;
//                 }

//                 throw new Error(errorMessage);
//             }

//             const data = await response.json();

//             // Show success toast
//             toast.success(`Registration successful! Please verify your account.`, {
//                 position: "top-center",
//                 autoClose: 3000, // 3 seconds
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });

//             // Navigate to verify page after 3 seconds (or immediately)
//             setTimeout(() => {
//                 navigate('/verify');
//             }, 3000);

//         } catch (error) {
//             toast.error(error.message, {
//                 position: "top-center",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
//                 <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
//                 <form onSubmit={handleRegister} className="space-y-6">
//                     <div>
//                         <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                             Username
//                         </label>
//                         <input
//                             type="text"
//                             id="username"
//                             name="username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                             className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter your username"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter your email"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter your password"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                         Register
//                     </button>
//                 </form>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default RegisterPage;


import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import contactImage from '../assets/images/contact.jpg'; // Importing the image

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleRegister = async (e) => {
        e.preventDefault();

        const requestBody = {
            username,
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                let errorMessage = `Error ${response.status}: ${response.statusText}`;

                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                }

                throw new Error(errorMessage);
            }

            const data = await response.json();

            // Show success toast
            toast.success(`Registration successful! Please verify your account.`, {
                // position: "top-center",
                autoClose: 3000, // 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Navigate to verify page after 3 seconds (or immediately)
            setTimeout(() => {
                navigate('/verify');
            }, 3000);

        } catch (error) {
            toast.error(error.message, {
                // position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="relative min-h-screen bg-black">
            {/* Semi-transparent Background Image */}
            <div className="absolute inset-0">
                <img
                    src={contactImage}
                    alt="Contacts Background"
                    className="w-full h-full object-cover opacity-10"
                />
            </div>

            {/* Form Overlay Section */}
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-3xl bg-white shadow-2xl rounded-lg p-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
                        Create Your Account
                    </h2>
                    <p className="text-center text-lg text-gray-600 mb-10">
                        Sign up to start managing your contacts effortlessly.
                    </p>

                    <form onSubmit={handleRegister} className="space-y-8">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-lg font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full mt-2 px-5 py-3 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                                placeholder="Enter your username"
                            />
                        </div>

                        {/* Email Field */}
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

                        {/* Password Field */}
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full px-6 py-4 text-white bg-black rounded-md text-xl hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                        >
                            Register
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="mt-10 text-center text-base text-gray-600">
                        Already a user?{' '}
                        <a
                            href="/login"
                            className="font-semibold text-black hover:underline"
                        >
                            Log in here
                        </a>
                    </p>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default RegisterPage;
