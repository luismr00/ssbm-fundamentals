import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmSignUp, resendConfirmationCode } from '../auth/authService';

const ConfirmSignUp = () => {
    
    const navigate = useNavigate();
    const location = useLocation();

    // const [email, setEmail] = useState(location.state?.email || '');
    // const [username, setUsername] = useState(location.state?.username || '');
    const [confirmationCode, setConfirmationCode] = useState('');

    const handleAssignRole = async () => {
        const response = await fetch('http://localhost:4000/dev/user/subscribe', {
            method: 'POST',
            include: 'credentials',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupName: 'Guest',
                username: location.state.email,
                isRegistering: true // This is a flag to indicate that the user can bypass the middleware when registering
            }),
        });
        const data = await response.json();
        console.log(data);
        
        try {
            if (response.status === 200) {
                alert('User added to group');
            } else {
                console.log('Failed to add user to group');
            }
        } catch (error) {
            console.error('Failed to add user to group: ', error);
        }
    };

    useEffect(() => {
        if (!location.state) {
            navigate('/register');
        }
    }, [location, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          await confirmSignUp(location.state.email, confirmationCode);
          await handleAssignRole();
          alert("Account confirmed successfully!\nSign in on next page.");
          navigate('/login');
        } catch (error) {
          alert(`Failed to confirm account: ${error}`);
        }
    };

    const handleConfirmationCode = async (e) => {
        e.preventDefault();
        try {
            await resendConfirmationCode(location.state.email);
            alert("Confirmation code resent successfully!");
        } catch (error) {
            alert(`Failed to resend confirmation code: ${error}`);
        }
    }

    return (
        <div>
            <h3>ConfirmSignUp</h3>
            <p>A confirmation code was sent to {location.state?.email}. Please check your email and enter the code received to validate your email.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                    className="inputText"
                    type="text"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    placeholder="Confirmation Code"
                    required />
                </div>
                <button type="submit">Confirm Account</button>
            </form>
            {/* set up a resend button link in case the user might now have gotten the confirmation code from aws cognito */}
            <p onClick={handleConfirmationCode} style={{cursor: 'pointer'}}>Didn't get the confirmation code? Resend</p>
        </div>
    )
}

export default ConfirmSignUp