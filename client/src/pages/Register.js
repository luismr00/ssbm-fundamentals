import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Progress from '../components/register/Progress'
import Form1 from '../components/register/Form1';
import Form2 from '../components/register/Form2';
import Form3 from '../components/register/Form3';
import Form4 from '../components/register/Form4';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [language, setLanguage] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [form, setForm] = useState(1);

    const handleFormChange = (direction) => {
        if(direction === 'next') {
            setForm(form + 1);
        } else {
            setForm(form - 1);
        }
    }

    return (
        <div className="gradient-bg font-roboto h-screen">
            <Navbar />
            <div className="flex flex-col justify-center custom-container text-white py-44">
                <div className='px-96'>
                    {form === 1 && <Form1 setEmail={setEmail} setPassword={setPassword} handleFormChange={handleFormChange} form={form}/>}
                    {form === 2 && <Form2 setFirstName={setFirstName} setLastName={setLastName} setCountry={setCountry} setLanguage={setLanguage} handleFormChange={handleFormChange} form={form}/>}
                    {form === 3 && <Form3 setPaymentMethod={setPaymentMethod} handleFormChange={handleFormChange} form={form}/>}
                    {form === 4 && <Form4 email={email} firstName={firstName} lastName={lastName} country={country} language={language} paymentMethod={paymentMethod} handleFormChange={handleFormChange} form={form}/>}
                </div>
                
                {/* <h3 className="text-h3">Create an Account</h3> */}
            </div>
        </div>
    )
}

export default Register