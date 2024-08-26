import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { signIn } from '../auth/authService';
import { Navigate, useNavigate } from 'react-router-dom';

const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        // Handle form submission
        event.preventDefault();

        if(!email || !password) {
            alert('Please fill in all fields');
            return;
        } else {
            await signIn(email, password);
            alert('Sign in successful');
            navigate('/');
        }
    }

    return (
        <div className="gradient-bg font-roboto h-screen">
        <Navbar />
        <div className="custom-container text-white">
            {/* Create a basic form for login details and center it. Have the logo above and outside the form so a user can return to the homepage */}
            <div className="flex flex-col justify-center items-center h-screen">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-black text-center text-subheading">Sign In</h2>
                    <input type="text" placeholder="Email" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit' className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Log In
                    </button>
                    <p className='mt-2'><a href="/forgot-password" className="text-blue-500">Forgot your password?</a></p>
                    <p className="text-sm text-gray-400 mt-2">Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
                </form>
            </div>
        </div>
        </div>
    )
}

export default LogIn