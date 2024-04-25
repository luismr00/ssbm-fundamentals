import React from 'react'
import Progress from './Progress'

const Form1 = ({setEmail, setPassword, handleFormChange, form}) => {
  return (
    <div>
      <div>
          <p className="text-h3 mb-6 font-bold text-white text-center">Create an Account</p>
          <Progress form={form}/>
          <input type="text" placeholder="Email" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" />
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleFormChange('next')}>
              Next
          </button>
          <p className="text-sm text-gray-400 mt-2">Already have an account? <a href="/login" className="text-blue-500">Log In</a></p>
      </div>
    </div>
  )
}

export default Form1