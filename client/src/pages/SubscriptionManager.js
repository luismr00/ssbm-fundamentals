import React, {useState, useEffect} from 'react'
import { checkSession } from "../auth/authService";
import { useNavigate } from 'react-router-dom';

//STEPS:
//1. Get subscription data from the backend
//2. Display the subscription data
//3. Add backend endpoint to cancel subscription which should simply change the subscriptionStatus to CANCELLED
//4. Add backend endpoint to cancel subscription to paypal once everything above works. The endpoint flow for the controller should be:
    // - Get the subscription data from the database
    // - Use the paypalId to cancel the subscription on paypal
    // - Update the subscriptionStatus in the database to CANCELLED once the subscription is cancelled on paypal

const SubscriptionManager = () => {

    const [subscriptionData, setSubscriptionData] = useState("YYYY-MM-DD");

    const navigate = useNavigate();

    const verifySession = async () => {
        const isLoggedIn = await checkSession();
        if (!isLoggedIn) {
            navigate("/login");
        }
    } 

    const getSubscription = async () => {
        const response = await fetch("http://localhost:4000/dev/subscription/read", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        console.log(data);

        if (data.error) {
            console.log(data.error);
            alert("Failed to get subscription data. Try again later.", data.error);
            navigate("/");
        } else {
            if(data.subscriptionStatus !== "ACTIVE") {
                alert("You do not have an active subscription");
                navigate("/pricing");
            }
            setSubscriptionData(data);
        }
    }

    const cancelSubscription = async () => {
        const response = await fetch("http://localhost:4000/dev/subscription/cancel", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subscriptionId: subscriptionData.paypalId })
        });

        const data = await response.json();
        console.log(data);

        if (data.error) {
            console.log(data.error);
            alert("Failed to cancel subscription", data.error);
        } else {
            alert(data.message);
        }
    }

    useEffect(() => {
        verifySession();
        getSubscription();
    }, []);

  return (
    <div>
      <h1>Subscription Manager</h1>
      <h2>--------------------</h2>
      <h3>Cancel Subscription</h3>
      <p>You are about to cancel your subscription but you should still have access until {subscriptionData.expirationDate} once you do. If you later wish resubscribe in the future simply follow the pricing page.</p>
      <button onClick={cancelSubscription}>Cancel</button>
    </div>
  )
}

export default SubscriptionManager
