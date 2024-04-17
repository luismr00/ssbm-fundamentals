import React from 'react'
import Progress from './Progress'

const Form4 = ({firstName, lastName, email, country, language, paymentMethod, handleFormChange, form}) => {
  return (
    <div>
        <div>
            <p className="text-h3 mb-6 font-bold text-white text-center">Confirmation</p>            
            <Progress form={form}/>
            <div className='flex flex-col gap-4 mb-4'>
                <div className='flex gap-4'>
                    <p className='text-white'>First Name:</p>
                    <p className='text-white'>{firstName}</p>
                </div>
                <div className='flex gap-4'>
                    <p className='text-white'>Last Name:</p>
                    <p className='text-white'>{lastName}</p>
                </div>
                <div className='flex gap-4'>
                    <p className='text-white'>Email:</p>
                    <p className='text-white'>{email}</p>
                </div>
                <div className='flex gap-4'>
                    <p className='text-white'>Country:</p>
                    <p className='text-white'>{country}</p>
                </div>
                <div className='flex gap-4'>
                    <p className='text-white'>Language:</p>
                    <p className='text-white'>{language}</p>
                </div>
                <div className='flex gap-4'>
                    <p className='text-white'>Payment Method:</p>
                    <p className='text-white'>{paymentMethod}</p>
                </div>
            </div>
            <div className='flex'>
                <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={() => handleFormChange('back')}>
                    Go Back
                </button>
                <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Complete
                </button>
            </div>
        </div>
    </div>
  )
}

export default Form4