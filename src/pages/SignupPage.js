import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleIcon } from '../Icons'; // We'll add this to Icons.js

// A new component for the password strength bar
const PasswordStrengthMeter = ({ password }) => {
    const [strength, setStrength] = useState({ width: '0%', color: '' });

    useEffect(() => {
        let score = 0;
        if (!password) {
            setStrength({ width: '0%', color: '' });
            return;
        }

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        switch (score) {
            case 1: setStrength({ width: '25%', color: 'bg-red-500' }); break;
            case 2: setStrength({ width: '50%', color: 'bg-yellow-500' }); break;
            case 3: setStrength({ width: '75%', color: 'bg-blue-500' }); break;
            case 4: setStrength({ width: '100%', color: 'bg-green-500' }); break;
            default: setStrength({ width: '10%', color: 'bg-red-500' });
        }
    }, [password]);

    return (
        <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
                className={`h-1.5 rounded-full transition-all duration-300 ${strength.color}`}
                style={{ width: strength.width }}
            ></div>
        </div>
    );
};

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        // ... (your existing handleSubmit logic)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-secondary py-12 px-4">
            <div className="max-w-md w-full space-y-8 animate-fade-in-up">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-brand-primary">Create an Account</h2>
                    <p className="mt-2 text-sm text-brand-text">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-brand-accent hover:text-brand-accent-hover">
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Social Logins */}
                <div className="flex justify-center">
                    <button className="flex items-center justify-center w-full max-w-xs py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-transform transform hover:scale-105">
                        <GoogleIcon />
                        <span className="ml-3">Sign Up with Google</span>
                    </button>
                </div>

                <div className="flex items-center justify-center">
                    <span className="h-px bg-gray-300 w-full"></span>
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <span className="h-px bg-gray-300 w-full"></span>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-brand-accent"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                            Full Name
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-brand-accent"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                            Email address
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-brand-accent"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                         <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                            Password
                        </label>
                    </div>
                    
                    <PasswordStrengthMeter password={password} />

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-accent hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-transform transform hover:scale-105"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
                {message && (
    <div className={`text-center p-3 rounded-md ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {message}
    </div>
)}
            </div>
        </div>
    );
};

export default SignupPage;