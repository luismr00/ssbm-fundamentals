import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Pricing = () => {

    const [yearly, setYearly] = useState(false);

    return (
        <div className="gradient-bg font-roboto">
            <Navbar />
            <div className="flex flex-col justify-center items-center custom-container text-white py-44">
                <b className='text-h2'>Pricing Plans</b>
                <p className='text-paragraph mt-4'>Choose the plan that suits your needs</p>
                {/* set to small container switches next to each other to select between monthly and yearly */}
                <div className='flex mt-8'>
                    <button className={`border-[1px] border-solid border-black w-[100px] h-[40px] ${!yearly? 'text-white bg-dark' : 'bg-white text-black'}`} onClick={() => setYearly(false)}>Monthly</button>
                    <button className={`border-[1px] border-solid border-black w-[100px] h-[40px] ${yearly? 'text-white bg-dark' : 'bg-white text-black'}`} onClick={() => setYearly(true)}>Yearly</button>
                </div>
                <div className='flex flex-col justify-center items-center p-8 bg-white text-black w-1/4 mt-16'>
                    <b className='text-subheading'>Basic Plan</b>
                    {yearly ? (
                        <b className='text-h3'>$120/yr</b>
                    ) : (
                        <b className='text-h3'>$15/mo</b>
                    )}
                    <div className='my-8'>
                        {/* write a list for get access to tutorials, get exclusive offers, and communnity support */}
                        <ul className='flex flex-col gap-4'>
                            <li>&#10003; Get access to all tutorials</li>
                            <li>&#10003; Get exclusive offers</li>
                            <li>&#10003; Community support</li>
                        </ul>
                    </div>
                    <button type='submit' className='bg-dark text-white font-bold mt-4 w-[100px] h-[50px]'>Submit</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Pricing