import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserInfo from '../components/profilePage/UserInfo'
import UserSubscriptions from '../components/profilePage/UserSubscriptions'

const ProfilePage = () => {

  const mockUser = {
    username: 'testuser',
    email: 'john.doe@mail.com',
    firstName: 'John',
    lastName: 'Doe',
    subscription: 'Free'
  }

  const [user, setUser] = useState({});
  const [changesAllowed, setChangesAllowed] = useState(false);

  const getUserData = async () => {
    const response = await fetch('http://localhost:4000/dev/user/getuser', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    const responseData = await response.json();
    // console.log(responseData);

    if (response.status === 200) {
      console.log('User data retrieved');
      console.log(responseData);
      setUser(responseData);
      if(responseData.verifyEmail === 'false') {
        alert('You will not be able to make changes until you verify your email.');
      } else {
        alert('You can now make changes to your profile.');
        setChangesAllowed(true);
      }
    } else {
      console.log('Failed to retrieve user data');
    }
  }

  const editUserInfo = async (newUsername, newFirstName, newLastName) => {
    const response = await fetch('http://localhost:4000/dev/user/edituser', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: newUsername,
        firstName: newFirstName,
        lastName: newLastName,
        email: user.email,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.status === 200) {
      console.log('User data updated');
      console.log(responseData);
      await refreshSession();
      await getUserData();
    } else {
      console.log('Failed to update user data');
    }
  }

  const addSubscription = async (email, subscription) => {
    const response = await fetch('http://localhost:4000/dev/user/subscribe', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        groupName: subscription,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.status === 200) {
      console.log('User subscribed');
      console.log(responseData);
    } else {
      console.log('Failed to subscribe user');
    }
  }

  const removeSubscription = async (email, subscription) => {
    const response = await fetch('http://localhost:4000/dev/user/unsubscribe', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        groupName: subscription,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.status === 200) {
      console.log('User unsubscribed');
      console.log(responseData);
    } else {
      console.log('Failed to unsubscribe user');
    }
  }

  const refreshSession = async () => {
    const response = await fetch('http://localhost:4000/dev/auth/refresh', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.status === 200) {
      console.log('Session refreshed');
      console.log(responseData);
    } else {
      console.log('Failed to refresh session');
    }
  }

  const editUserSubscription = async (email, currentSubscription, newSubscription) => {
    // wait for backend to implement this
    console.log('editing user subscription...');
    // console.log(email);
    // console.log(currentSubscription);
    // console.log(newSubscription);
    console.log('adding subscription...');
    await addSubscription(email, newSubscription);
    console.log('removing subscription...');
    await removeSubscription(email, currentSubscription);
    console.log('subscriptions updated');
    await refreshSession();
    await getUserData();
  }
    
  useEffect(() => {
    // Fetch user data from token
    getUserData();
    
  }, []);

  return (
    <div className="gradient-bg font-heading-style">
        <Navbar />
        <div className="flex flex-col justify-center custom-container text-white py-44">
          <div className='px-96'>
            <div className='h-screen'>
              <h1 className="text-center">Profile Page</h1>
              <UserInfo user={user} changesAllowed={changesAllowed} editUserInfo={editUserInfo}/>
              <div className='mb-6'>
                <div className='flex'>
                  <h2 className='pe-3'>User Email</h2>
                  <button>Edit Email</button>
                </div>
                <h2>--------------------</h2>
                <h2>Email: {user.email}</h2>
              </div>
              <div className='mb-6'>
                <div className='flex'>
                  <h2 className='pe-3'>Password</h2>
                  <button>Edit Password</button>
                </div>
                <h2>--------------------</h2>
                <h2>Password: *****************</h2>
              </div>
              <UserSubscriptions user={user} changesAllowed={changesAllowed} editUserSubscription={editUserSubscription}/>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default ProfilePage;