import React, {useState, useEffect} from 'react'
import Progress from './Progress'

const Form4 = ({
    firstName, 
    lastName, 
    email, 
    password,
    securityQuestion1,
    securityAnswer1,
    securityQuestion2,
    securityAnswer2,
    securityQuestion3,
    securityAnswer3,
    paymentMethod, 
    subscriptionPlan,
    subscriptionDuration,
    fixedDuration,
    promoCode,
    profilePicture,
    handleFormChange, 
    form, 
}) => {

    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        calculateSubtotal();
    }, [subscriptionPlan, subscriptionDuration, fixedDuration]);

    useEffect(() => {
        calculateTotal();
    }, [subtotal, promoCode]);

    const calculateSubtotal = () => {
        let subtotalAmount = 0;

        if (subscriptionDuration === 'fixed') {
            // Calculate fixed duration subscription subtotal
            subtotalAmount = calculateFixedDurationCost();
        } else {
            // Calculate monthly or yearly subscription subtotal
            subtotalAmount = calculateMonthlyOrYearlyCost();
        }

        setSubtotal(subtotalAmount);
    };

    const calculateTotal = () => {
        let totalAmount = subtotal;

        // Calculates promo code AND yearly promo discount in case no promo code is provided
        const promoDiscount = calculatePromoDiscount(subtotal); 
        totalAmount -= promoDiscount;

        setDiscount(promoDiscount);
        setTotal(totalAmount);
    };

    const calculateFixedDurationCost = () => {
        // Fixed duration subscription cost based on the selected number of months
        if(subscriptionPlan === 'basic') {
            return fixedDuration * 15; // $15 per month
        } else if(subscriptionPlan === 'premium') {
            return fixedDuration * 30; // $30 per month
        }
    };

    const calculateMonthlyOrYearlyCost = () => {
        // Monthly or yearly subscription cost
        if (subscriptionPlan === 'basic') {
            // setDiscount(30);
            return subscriptionDuration === 'yearly' ? 180 : 15;
        } else if (subscriptionPlan === 'premium') {
            // setDiscount(60);
            return subscriptionDuration === 'yearly' ? 360 : 30;
        }
        return 0;
    };

    const yearlyPromoDiscount = () => {
        if(subscriptionPlan === 'basic' && subscriptionDuration === 'yearly') {
            return 30;
        } else if(subscriptionPlan === 'premium' && subscriptionDuration === 'yearly') {
            return 60;
        }
    }

    const calculatePromoDiscount = (subtotal) => {
        // Calculate promo code discount based on business logic
        // Example: 20% off for 3 months subscription

        //handle promo code for fixed duration subscription example
        //add more promo examples here to work on later but think about what promos you want to offer first
        //pseudo code variables to fetch from database
            //promoCode
            //promoType
            //promoDuration
            //promoExpirationDate
            //promoDiscountPercentage

        //regular promo code for yearly subscription
        if(promoCode === '' && subscriptionDuration === 'yearly') {
            return yearlyPromoDiscount();
        }  else {
            return 0; // Return the discount amount
        }
    };

    // POST request to register a new user
    const registerUser = async () => {
        // Fetch the user data from the form
        const userData = {
            email,
            password,
            firstName,
            lastName,
            profilePicture,
            plan: subscriptionPlan,
            subscription: {
                start_date: new Date(),
                end_date: new Date(),
                status: 'active',
                payment_gateway: paymentMethod,
            },
            securityQuestions: [
                {
                    question: securityQuestion1,
                    answer: securityAnswer1,
                },
                {
                    question: securityQuestion2,
                    answer: securityAnswer2,
                },
                {
                    question: securityQuestion3,
                    answer: securityAnswer3,
                }
            ],
            promotion: {
                type: 'none',
                duration: 0,
                expirationDate: new Date(),
                promoCode: 'none',
                discountPercentage: 0,
            },
        };

        // Send the user data to the server
        const response = await fetch('http://localhost:4000/api/users/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'credentials': 'include'
            },
            body: JSON.stringify(userData),
        });

        // Get the response from the server
        const data = await response.json();
        //handle data error and sucess
        if (data.success === true) {
            console.log('User registered successfully');
            return true;
        } else {
            console.error(data.message);
            return false;
        }
    };

    const handleConfirmation = async () => {
        const response = await registerUser();
        if(response === true) {
            handleFormChange('next');
        } else {
            alert('Error registering user');
        }
    }


  return (
    <div>
        <div>
            <p className="text-h3 mb-6 font-bold text-white text-center">Confirmation</p>            
            <Progress form={form}/>
            <div className='flex gap-16 mb-2 bg-white p-24'>
                <div className='flex items-center'>
                    <img src={profilePicture} alt="Profile Picture" className="w-48 h-48 rounded-full mx-auto"/>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <b className='text-black'>First Name:</b>
                        <p className='text-black'>{firstName}</p>
                    </div>
                    <div className='flex gap-2'>
                        <b className='text-black'>Last Name:</b>
                        <p className='text-black'>{lastName}</p>
                    </div>
                    <div className='flex gap-2'>
                        <b className='text-black'>Email:</b>
                        <p className='text-black'>{email}</p>
                    </div>
                    <div className='flex gap-2'>
                        <b className='text-black'>{securityQuestion1}:</b>
                        <p className='text-black'>{securityAnswer1}</p>
                    </div>
                    <div className='flex gap-2'>
                        <b className='text-black'>{securityQuestion2}:</b>
                        <p className='text-black'>{securityAnswer2}</p>
                    </div>
                    <div className='flex gap-2'>
                        <b className='text-black'>{securityQuestion3}:</b>
                        <p className='text-black'>{securityAnswer3}</p>
                    </div>
                    <div className='flex gap-2'>
                        <b className='text-black'>Payment Method:</b>
                        <p className='text-black'>{paymentMethod}</p>
                    </div>
                    <div className='flex gap-2'>
                        <b className='text-black'>Subscription Plan:</b>
                        <p className='text-black'>{subscriptionPlan}</p>
                    </div>
                    <div className='flex gap-2'>
                        <b className='text-black'>Subscription Duration:</b>
                        <p className='text-black'>{subscriptionDuration}</p>
                    </div>
                    {subscriptionDuration === 'fixed' && (
                        <div className='flex gap-2'>
                            <b className='text-black'>Fixed Duration:</b>
                            <p className='text-black'>{fixedDuration} Month(s)</p>
                        </div>
                    )}
                    {promoCode && (
                        <div className='flex gap-2'>
                            <b className='text-black'>Promo Code:</b>
                            <p className='text-black'>{promoCode}</p>
                        </div>
                    )}
                    <hr></hr>
                    {/* <div className='flex gap-2'>
                        <b className='text-black'>Total:</b>
                        <p className='text-black'>$15.00</p>
                    </div> */}
                    <div className='flex gap-2'>
                        <b className='text-black'>Subtotal:</b>
                        <p className='text-black'>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className='flex gap-2'>
                        <b className='text-black'>Discount:</b>
                        <p className='text-black'>${discount.toFixed(2)}</p>
                    </div>
                    <div className='flex gap-2'>
                        <b className='text-black'>Total:</b>
                        <p className='text-black'>${total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <div className='mb-6'>
                <input type="checkbox" id="terms" name="terms" value="terms" className='mr-2' />
                <label for="terms">If you wish to receive newsletters when new content is added or new promotions are released then click on this checkbox.</label>
            </div>
            <div className='flex'>
                <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={() => handleFormChange('back')}>
                    Go Back
                </button>
                <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleConfirmation}>
                    Complete
                </button>
            </div>
        </div>
    </div>
  )
}

export default Form4