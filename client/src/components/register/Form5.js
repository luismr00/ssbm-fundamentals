import React from 'react'
import Progress from './Progress'

const Form4 = ({firstName, lastName, email, country, language, paymentMethod, handleFormChange, form, profilePicture}) => {
  return (
    <div className='h-screen'>
        <p className="text-h3 mb-6 font-bold text-white text-center">Success</p>            
        <Progress form={form}/>
        <div className='flex flex-col gap-4 mb-4'>
            <p className='text-white text-center'>Thank you for registering!</p>
            <p className='text-white text-center'>Your account has been created successfully. You will be receiving an email confirmation shortly along with a link to help you confirm your email and completely activate your account. </p>
        </div>
    </div>
  )
}

export default Form4