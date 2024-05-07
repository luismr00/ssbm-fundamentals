import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Progress from '../components/register/Progress'
import Form1 from '../components/register/Form1';
import Form2 from '../components/register/Form2';
import Form3 from '../components/register/Form3';
import Form4 from '../components/register/Form4';
import Form5 from '../components/register/Form5';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/150');
    const [fileName, setFileName] = useState('No file chosen');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [language, setLanguage] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [subscriptionPlan, setSubscriptionPlan] = useState(''); // ['basic', 'premium', 'none'
    const [subscriptionDuration, setSubscriptionDuration] = useState(''); // Number of months
    const [fixedDuration, setFixedDuration] = useState('');
    const [form, setForm] = useState(1);
    const [securityQuestion1, setSecurityQuestion1] = useState("");
    const [securityQuestion2, setSecurityQuestion2] = useState("");
    const [securityQuestion3, setSecurityQuestion3] = useState("");
    const [securityAnswer1, setSecurityAnswer1] = useState("");
    const [securityAnswer2, setSecurityAnswer2] = useState("");
    const [securityAnswer3, setSecurityAnswer3] = useState("");
    const [promoCode, setPromoCode] = useState("");

    const handleFormChange = (direction) => {
        if(direction === 'next') {
            setForm(form + 1);
        } else {
            setForm(form - 1);
        }
    }

    return (
        <div className={`gradient-bg font-roboto`}>
            <Navbar />
            <div className="flex flex-col justify-center custom-container text-white py-44">
                <div className='px-96'>
                    {form === 1 && <Form1 
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword} 
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        handleFormChange={handleFormChange} 
                        form={form}
                    />}
                    {form === 2 && <Form2 
                        firstName={firstName}
                        setFirstName={setFirstName} 
                        lastName={lastName}
                        setLastName={setLastName} 
                        securityQuestion1={securityQuestion1}
                        setSecurityQuestion1={setSecurityQuestion1}
                        securityQuestion2={securityQuestion2}
                        setSecurityQuestion2={setSecurityQuestion2}
                        securityQuestion3={securityQuestion3}
                        setSecurityQuestion3={setSecurityQuestion3}
                        securityAnswer1={securityAnswer1}
                        setSecurityAnswer1={setSecurityAnswer1}
                        securityAnswer2={securityAnswer2}
                        setSecurityAnswer2={setSecurityAnswer2}
                        securityAnswer3={securityAnswer3}
                        setSecurityAnswer3={setSecurityAnswer3}
                        handleFormChange={handleFormChange} 
                        form={form} 
                        profilePicture={profilePicture} 
                        setProfilePicture={setProfilePicture} 
                        fileName={fileName} 
                        setFileName={setFileName}
                    />}
                    {form === 3 && <Form3 
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        subscriptionPlan={subscriptionPlan} 
                        setSubscriptionPlan={setSubscriptionPlan} 
                        subscriptionDuration={subscriptionDuration} 
                        setSubscriptionDuration={setSubscriptionDuration} 
                        fixedDuration={fixedDuration}
                        setFixedDuration={setFixedDuration} 
                        promoCode={promoCode}
                        setPromoCode={setPromoCode}
                        handleFormChange={handleFormChange} form={form}/>}
                    {form === 4 && <Form4 
                        email={email} 
                        password={password}
                        firstName={firstName} 
                        lastName={lastName}
                        securityQuestion1={securityQuestion1}
                        securityAnswer1={securityAnswer1}
                        securityQuestion2={securityQuestion2}
                        securityAnswer2={securityAnswer2}
                        securityQuestion3={securityQuestion3}
                        securityAnswer3={securityAnswer3} 
                        paymentMethod={paymentMethod}
                        subscriptionPlan={subscriptionPlan}
                        subscriptionDuration={subscriptionDuration}
                        fixedDuration={fixedDuration}
                        promoCode={promoCode}
                        profilePicture={profilePicture}
                        handleFormChange={handleFormChange} 
                        form={form} 
                    />}
                    {form === 5 && <Form5 form={form} />}
                </div>
                
                {/* <h3 className="text-h3">Create an Account</h3> */}
            </div>
        </div>
    )
}

export default Register