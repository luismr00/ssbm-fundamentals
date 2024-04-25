import React from 'react'
import Progress from './Progress'

const Form3 = ({setPaymentMethod, handleFormChange, form}) => {
  return (
    <div>
        {/* Create a div that asks for billing information. This should display a plan of $15 dollars per month and payment options to select between credit card and paypal. Depending of the select display a message that on confirmation checkout they will either be sent externally to Paypal or Stripe to confirm the payment. At the very end shoudl have an option to skip payment step in case a user wants to think things through and pay later.*/}
        <div>
            <p className="text-h3 mb-6 font-bold text-white text-center">Billing Information</p>
            <Progress form={form}/>
            <p className="text-white mb-4 text-center text-paragraph">You are about to subscribe to the monthly plan of $15.00</p>
            <p className='text-white mb-4 text-center text-paragraph'>Upon checkout, you will be redirected to a payment provider page depending which payment method you choose to complete the payment process. Please note that if you wish to skip payment for now, you won't be able to take advantage of all the tutorials available.</p>
            <p className="text-white mb-2 text-center text-paragraph">Select a payment method:</p>
            {/* Create two radio options with an image placeholder next to it */}
            <div className='flex gap-4 mb-4 justify-center'>
                <div className='flex items-center'>
                    <input type="radio" id="credit-card" name="payment-method" value="debit-credit-card" onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <label for="credit-card" className='text-white ml-2'>Debit/Credit Card</label>
                </div>
                <div className='flex items-center'>
                    <input type="radio" id="paypal" name="payment-method" value="paypal" onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <label for="paypal" className='text-white ml-2'>Paypal</label>
                </div>
            </div>
            {/* <select className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black">
                <option value="credit-card">Credit Card</option>
                <option value="paypal">Paypal</option>
            </select> */}
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded">
                Skip payment
            </button>
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

export default Form3