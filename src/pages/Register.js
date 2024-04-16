import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Progress from '../components/register/Progress'

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [language, setLanguage] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    return (
        <div className="gradient-bg font-roboto">
            <Navbar />
            <div className="flex flex-col justify-center custom-container text-white py-44">
                <div className='px-64'>
                    <Progress />
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-white text-center text-subheading">Create an Account</h2>
                        <input type="text" placeholder="Email" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder="Confirm Password" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" />
                        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Next
                        </button>
                        <p className="text-sm text-gray-400 mt-2">Already have an account? <a href="/login" className="text-blue-500">Log In</a></p>
                    </div>
                    <Progress />
                    {/* Create a div with fields to setup the profile account that asks for first name, last name, country(should have a default country based on IP location), profile picture edit, and a language selection between english and spanish for now */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-black text-center text-subheading text-white">Setup Profile</h2>
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
                            <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                                Go Back
                            </button>
                            <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Next
                            </button>
                        </div>
                    </div>
                    <Progress />
                    {/* Create a div that asks for billing information. This should display a plan of $15 dollars per month and payment options to select between credit card and paypal. Depending of the select display a message that on confirmation checkout they will either be sent externally to Paypal or Stripe to confirm the payment. At the very end shoudl have an option to skip payment step in case a user wants to think things through and pay later.*/}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-black text-center text-subheading text-white">Billing Information</h2>
                        <p className="text-white mb-4 text-center">You are about to subscribe to the monthly plan of $15.00</p>
                        <p className='text-white mb-4 text-center'>Upon checkout, you will be redirected to a payment provider page depending which payment method you choose to complete the payment process. Please note that if you wish to skip payment for now, you won't be able to take advantage of all the tutorials available.</p>
                        <p className="text-white mb-2 text-center">Select a payment method:</p>
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
                            <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                                Go Back
                            </button>
                            <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Next
                            </button>
                        </div>
                    </div>
                    <Progress />
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-black text-center text-subheading text-white">Confirmation</h2>
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
                    </div>
                    {/* Add go back and complete buttons with flex and even width properties */}
                    <div className='flex'>
                        <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                            Go Back
                        </button>
                        <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Complete
                        </button>
                    </div>
                </div>
                
                {/* <h3 className="text-h3">Create an Account</h3> */}
            </div>
        </div>
    )
}

export default Register