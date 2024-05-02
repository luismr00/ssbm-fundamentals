import React from 'react'
import Progress from './Progress'

const Form3 = ({ paymentMethod, setPaymentMethod, subscriptionDuration, subscriptionPlan , setSubscriptionPlan, setSubscriptionDuration, fixedDuration, setFixedDuration, promoCode, setPromoCode, handleFormChange, form }) => {
    
    const validateForm = () => {
      if (subscriptionDuration === '' || subscriptionPlan === '' || paymentMethod === '') {
        alert('Please fill out all fields');
      } else if (subscriptionDuration === 'fixed' && !fixedDuration) {
        alert('Please select a fixed duration');
      } else {
        handleFormChange('next');
      }
    }
  
    return (
      <div>
        <div>
          <p className="text-h3 mb-6 font-bold text-white text-center">Billing Information</p>
          <Progress form={form} />
          <p className="text-white mb-4 text-center text-paragraph">You are about to subscribe to the monthly plan of $15.00</p>
          <p className='text-white mb-4 text-center text-paragraph'>Upon checkout, you will be redirected to a payment provider page depending on which payment method you choose to complete the payment process. Please note that if you wish to skip payment for now, you won't be able to take advantage of all the tutorials available.</p>
          {/* <label className="text-white mb-2 text-center text-paragraph">Select a payment method:</label> */}
          {/* Selector for Payment Method */}
          <select className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setPaymentMethod(e.target.value)}>
            <option disabled selected={paymentMethod === ''} value="">Select Payment Method</option>
            {/* mark selected if paymentMethod matches the option value */}
            <option value="paypal" selected={paymentMethod === 'paypal'}>Paypal</option>
            <option value="stripe" selected={paymentMethod === 'stripe'}>Stripe</option>
            <option value="none" selected={paymentMethod === 'none'}>None</option>
          </select>
  
          {/* <label className="text-white mb-2 text-center text-paragraph">Select subscription plan:</label> */}
          {/* Selector for Subscription Plan */}
          <select className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setSubscriptionPlan(e.target.value)}>
            <option value="" disabled selected={subscriptionPlan === ''}>Select Subscription Plan</option>
            <option value="basic" selected={subscriptionPlan === 'basic'}>Basic - $15.00 USD</option>
            <option value="premium" selected={subscriptionPlan === 'premium'} >Premium - $30.00 USD</option>
          </select>
  
          {/* <label className="text-white mb-2 text-center text-paragraph">Select subscription duration:</label> */}
          {/* Selector for Subscription Duration */}
          <select className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setSubscriptionDuration(e.target.value)}>
            <option value="" disabled selected={subscriptionDuration === ''}>Select Subscription Duration</option>
            <option value="monthly" selected={subscriptionDuration === 'monthly'}>Monthly</option>
            <option value="yearly" selected={subscriptionDuration === 'yearly'}>Yearly</option>
            <option value="fixed" selected={subscriptionDuration === 'fixed'}>Fixed</option>
          </select>
  
          {/* Conditional Selector for Fixed Subscription Duration */}
          {subscriptionDuration === 'fixed' && (
            <select className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={fixedDuration} onChange={(e) => setFixedDuration(e.target.value)}>
              <option value="" disabled selected>Select Fixed Duration</option>
                {Array.from({ length: 11 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1} Month(s)
                    </option>
                ))}
            </select>
          )}
  
          {/* <label className="text-white mb-2 text-center text-paragraph">Enter Promo Code (if applicable):</label> */}
          {/* Input for Promo Code */}
          <input type="text" placeholder="Enter Promo Code (if applicable)" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
  
          {/* <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded">
            Skip payment
          </button> */}
          <div className='flex'>
            <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={() => handleFormChange('back')}>
              Go Back
            </button>
            <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={validateForm}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Form3;
  