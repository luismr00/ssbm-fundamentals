import React from 'react'
import Progress from './Progress'

const Form1 = ({email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleFormChange, form}) => {

  const validateForm = () => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (email === '' || password === '' || confirmPassword === '') {
      alert('Please fill out all fields');
      // return false;
    } else if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      // return false;
    } else if (password !== confirmPassword) {
      alert('Passwords do not match');
      // return false;
    } else {
      // return true;
      handleFormChange('next');
    } 
  }

  return (
    <div className='h-screen'>
        <p className="text-h3 mb-6 font-bold text-white text-center">Create an Account</p>
        <Progress form={form}/>
        <input type="text" placeholder="Email" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={validateForm}>
            Next
        </button>
        <p className="text-sm text-gray-400 mt-2">Already have an account? <a href="/login" className="text-blue-500">Log In</a></p>
    </div>
  )
}

export default Form1