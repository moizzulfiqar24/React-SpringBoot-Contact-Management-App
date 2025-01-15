// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const VerifyPage = () => {
//     const [email, setEmail] = useState('');
//     const [verificationCode, setVerificationCode] = useState('');
//     const navigate = useNavigate(); // Hook for navigation

//     const handleVerification = async (e) => {
//         e.preventDefault();

//         const requestBody = {
//             email,
//             verificationCode,
//         };

//         try {
//             const response = await fetch('http://localhost:8080/auth/verify', {
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
//                     errorMessage = errorData || errorMessage;
//                 }

//                 throw new Error(errorMessage);
//             }

//             // Success toast and redirect to login
//             toast.success('Account verified successfully! Redirecting to login...', {
//                 position: "top-center",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });

//             setTimeout(() => {
//                 navigate('/login'); // Redirect to login after 3 seconds
//             }, 3000);
//         } catch (error) {
//             toast.error(`Verification failed: ${error.message}`, {
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
//                 <h2 className="text-2xl font-bold text-center mb-6">Verify Your Email</h2>
//                 <form onSubmit={handleVerification} className="space-y-6">
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
//                         <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
//                             Verification Code
//                         </label>
//                         <input
//                             type="text"
//                             id="verificationCode"
//                             name="verificationCode"
//                             value={verificationCode}
//                             onChange={(e) => setVerificationCode(e.target.value)}
//                             required
//                             className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter verification code"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                         Verify
//                     </button>
//                 </form>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default VerifyPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import contactImage from '../assets/images/contact.jpg'; // Importing the background image

const VerifyPage = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleVerification = async (e) => {
        e.preventDefault();

        const requestBody = {
            email,
            verificationCode,
        };

        try {
            const response = await fetch('http://localhost:8080/auth/verify', {
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
                    errorMessage = errorData || errorMessage;
                }

                throw new Error(errorMessage);
            }

            // Success toast and redirect to login
            toast.success('Account verified successfully! Redirecting to login...', {
                // position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setTimeout(() => {
                navigate('/login'); // Redirect to login after 3 seconds
            }, 3000);
        } catch (error) {
            toast.error(`Verification failed: ${error.message}`, {
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
                        Verify Your Email
                    </h2>
                    <p className="text-center text-lg text-gray-600 mb-10">
                        Enter your email and verification code to verify your account.
                    </p>

                    <form onSubmit={handleVerification} className="space-y-8">
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

                        {/* Verification Code Field */}
                        <div>
                            <label htmlFor="verificationCode" className="block text-lg font-medium text-gray-700">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                id="verificationCode"
                                name="verificationCode"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                required
                                className="w-full mt-2 px-5 py-3 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                                placeholder="Enter verification code"
                            />
                        </div>

                        {/* Verify Button */}
                        <button
                            type="submit"
                            className="w-full px-6 py-4 text-white bg-black rounded-md text-xl hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                        >
                            Verify
                        </button>
                    </form>

                    {/* Redirect to Login */}
                    <p className="mt-10 text-center text-base text-gray-600">
                        Already verified?{' '}
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

export default VerifyPage;
