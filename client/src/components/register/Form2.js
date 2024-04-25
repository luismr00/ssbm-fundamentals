import React from 'react'
import Progress from './Progress'

const Form2 = ({setFirstName, setLastName, setCountry, setLanguage, handleFormChange, form}) => {
  return (
    <div>
        {/* Create a div with fields to setup the profile account that asks for first name, last name, country(should have a default country based on IP location), profile picture edit, and a language selection between english and spanish for now */}
        <div>
            <p className="text-h3 mb-6 font-bold text-white text-center">Setup Profile</p>
            <Progress form={form}/>
            <input type="file" placeholder="Profile Picture" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-white" />
            <input type="text" placeholder="First Name" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" placeholder="Last Name" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setLastName(e.target.value)}/>
            <select className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setCountry(e.target.value)}>
                <option value="United States">United States</option>
                <option value="Mexico">Mexico</option>
            </select>
            <select className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setLanguage(e.target.value)}>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
            </select>
            <div className='flex'>
                <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={() => handleFormChange('back')}>
                    Go Back
                </button>
                <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleFormChange('next')}>
                    Next
                </button>
            </div>
        </div>
    </div>
  )
}

export default Form2