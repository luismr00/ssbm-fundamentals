import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useRef, useEffect } from "react";
import { checkSession } from "../auth/authService";
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [subType, setSubType] = useState("basic");
    const [paymentFrequency, setPaymentFrequency] = useState("monthly");
    const [eventData, setEventData] = useState(null);
    const [eventActions, setEventActions] = useState(null);
    const subTypeRef = useRef(subType);  // Hold the latest value of subType in a ref
    const paymentFrequencyRef = useRef(paymentFrequency);
    const navigate = useNavigate();

    const test = () => {

        const currentDate = new Date();
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);

        const item = {
            createdDate: currentDate.toISOString().slice(0, 10),
            expirationDate: expiryDate.toISOString().slice(0, 10),
            paypalId: "eventData.subscriptionID",
            paymentSource: "eventData.paymentSource",
            subscriptionStatus: "ACTIVE",
            subscriptionTier: "Basic",
            subscriptionType: paymentFrequency === "monthly" ? "RECURRING" : "ONE-TIME",
        }

        console.log(item);
    }

    const subscribe = async (subscriptionData) => {

        //generate current and expiry date for the subscription in the format of YYYY-MM-DD
        const currentDate = new Date();
        const expiryDate = new Date();
        //set expiry date to 1 day from the current date but then change it to one month after production
        expiryDate.setDate(expiryDate.getDate() + 1);
        // expiryDate.setMonth(expiryDate.getMonth() + 1);

        // Add id to the item object on the backend
        const item = {
            createdDate: currentDate.toISOString().slice(0, 10),
            expirationDate: expiryDate.toISOString().slice(0, 10),
            paypalId: subscriptionData.subscriptionID,
            paymentSource: subscriptionData.paymentSource,
            subscriptionStatus: "ACTIVE",
            subscriptionTier: "Basic",
            subscriptionType: paymentFrequency === "monthly" ? "RECURRING" : "ONE-TIME",
        }

        const response = await fetch("http://localhost:4000/dev/subscription/create", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        });

        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            alert(data.message);
        } else {
            alert("Failed to create subscription on the backend");
        }
    }

    const handleSubscriptionCreate = async (data, actions) => {
        let planId;
        if (subType === "basic") {
            planId = paymentFrequency === "monthly" ? process.env.REACT_APP_BASIC_MONTHLY_PLAN_ID : process.env.REACT_APP_BASIC_ONETIME_PLAN_ID;
        } else {
            planId = paymentFrequency === "monthly" ? process.env.REACT_APP_PREMIUM_MONTHLY_PLAN_ID : process.env.REACT_APP_PREMIUM_ONETIME_PLAN_ID;
        }

        console.log("planId", planId);
        console.log("subType", subType);
        console.log("paymentFrequency", paymentFrequency);
        // console.log("subType from ref", subTypeRef.current);
        try {
            const subscription = await actions.subscription.create({
                'plan_id': planId
            });
            console.log("Subscription created successfully:", subscription);
            return subscription;
        } catch (error) {
            console.error("Error creating subscription:", error);
            alert("There was an error creating the subscription. Please try again.");
        }
    };

        useEffect(() => {
            subTypeRef.current = subType;  // Update the ref when subType changes
            console.log("Current subType:", subType);
            console.log("Current paymentFrequency:", paymentFrequency);
        }, [subType, paymentFrequency]);

        const verifySession = async () => {
            const isLoggedIn = await checkSession();
            if (!isLoggedIn) {
                navigate("/login");
            }
        } 

        useEffect(() => {
            verifySession();
        }, []);

    return (
        <PayPalScriptProvider options={{ 
            "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
            "vault": true, 
        }}>
            <div>
                <h2>Choose Subscription Type:</h2>
                <select value={subType} onChange={(e) => setSubType(e.target.value)}>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                </select>

                <h2>Choose Payment Frequency:</h2>
                <select value={paymentFrequency} onChange={(e) => setPaymentFrequency(e.target.value)}>
                    <option value="monthly">Monthly</option>
                    <option value="one-time">One-time</option>
                </select>

                <h3>Subscription Payment</h3>
                <PayPalButtons
                    key={`${subType}-${paymentFrequency}`} // Ensure re-render when state changes
                    style={{
                        shape: "rect",
                        layout: "vertical",
                        color: "gold",
                        label: "subscribe",
                    }}
                    createSubscription={handleSubscriptionCreate}
                    onApprove={(data, actions) => {
                        console.log("Subscription approved!");
                        console.log(data);
                        setEventData(JSON.stringify(data, null, 2));
                        setEventActions(JSON.stringify(actions, null, 2));
                        console.log(actions);
                        subscribe(data);
                    }}
                    onError={(err) => {
                        console.error("PayPal Button Error:", err);
                        alert("There was an error processing your payment. Please try again.");
                    }}
                />
                <h1>Event Data</h1>
                <p>{eventData}</p>
                <h1>Event Actions</h1>
                <p>{eventActions}</p>

                <button onClick={test}>Test</button>
            </div>
        </PayPalScriptProvider>
        
    );
}

export default Checkout
