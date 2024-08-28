import React, {useState, useEffect} from 'react'

const ProfilePage = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    // Fetch user data from token
  }, [user]);

  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage;