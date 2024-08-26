import React from 'react'

const RegisterFields = ({username, setUsername, firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleSignUp}) => {
  return (
    <div className='h-screen'>
        <p className="text-h3 mb-6 font-bold text-white text-center">Create an Account</p>
        <input type="text" placeholder="Username" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="First name" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last name" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="text" placeholder="Email" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
            Register
        </button>
        <p className="text-sm text-gray-400 mt-2">Already have an account? <a href="/login" className="text-blue-500">Log In</a></p>
    </div>
  )
}

export default RegisterFields