import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { signUp } from '../auth/authService'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        try {
          await signUp(username, email, password, firstName, lastName);
          navigate('/confirm', { state: { email, username } });
        } catch (error) {
          alert(`Sign up failed: ${error}`);
        }
    };

    return (
        <div className={`gradient-bg font-roboto`}>
            <Navbar />
            <div className="flex flex-col justify-center custom-container text-white py-44">
                <div className='px-96'>
                    <div className='h-screen'>
                        <p className="text-h3 mb-6 font-bold text-white text-center">Create an Account</p>
                        <input type="text" placeholder="Username" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="text" placeholder="First name" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <input type="text" placeholder="Last name" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <input type="text" placeholder="Email" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder="Confirm Password" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignUp}>
                            Register
                        </button>
                        <p className="text-sm text-gray-400 mt-2">Already have an account? <a href="/login" className="text-blue-500">Log In</a></p>
                    </div>       
                </div>
                
                {/* <h3 className="text-h3">Create an Account</h3> */}
            </div>
        </div>
    )
}

export default Register