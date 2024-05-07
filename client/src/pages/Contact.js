import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { HandymanOutlined } from '@mui/icons-material';

const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        // write an event preventdefault below
        event.preventDefault();
        if(name && email && message) 
            alert("All fields have been field out");
        else
            alert("Missing fields.")
    }

    return (
        <div className="gradient-bg font-roboto">
            <Navbar />
            <div className="flex flex-col justify-center items-center custom-container text-white py-44">
                <b className='text-h2'>Get in Touch</b>
                <p className='text-paragraph mt-2'>Have any questions or feedback? Feel free to reach out.</p>
                {/* Add input with labels within a form for name, email, textarea message, and a submit button. */}
                <form className='flex flex-col w-1/3 mt-8 gap-4' onSubmit={handleSubmit}>
                    <label>
                        Name
                    </label>
                    <input type='text' className='p-2 border border-gray-300 text-black' onChange={(e) => setName(e.target.value)}/>
                    <label>
                        Email
                    </label>
                    <input type='email' className='p-2 border border-gray-300 text-black' onChange={(e) => setEmail(e.target.value)}/>
                    <label>
                        Message
                    </label>
                    <textarea className='p-2 border border-gray-300 text-black h-[180px]' onChange={(e) => setMessage(e.target.value)}/>
                    <div className='flex justify-center mt-4'>
                        <button type='submit' className='bg-dark text-white font-bold py-2 px-4 w-[100px] h-[50px]'>Submit</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Contact