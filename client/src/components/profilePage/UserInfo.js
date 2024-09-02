import React, {useState} from 'react'

const UserInfo = ({user, changesAllowed, editUserInfo}) => {

  const [edit, setEdit] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');

  const handleEdit = () => {
    setEdit(true);
  }

  const handleCancel = () => {
    setEdit(false);
  }

  const handleSave = async () => {
    // wait for backend to implement this
    await editUserInfo(newUsername, newFirstName, newLastName);
    setEdit(false);
  }

  return (
    <div className='mb-6'>
        <div className='flex'>
            <h2 className='pe-3'>User Profile</h2>
            <button className={!changesAllowed ? 'invisible' : edit ? 'invisible' : 'visible'} onClick={handleEdit}>Edit Profile</button>
        </div>
        <h2>--------------------</h2>
        {!edit ? (
            <div>
                <h2>Username: {user.username}</h2>
                <h2>First Name: {user.firstName}</h2>
                <h2>Last Name: {user.lastName}</h2>
            </div>
        ) : (
            <div className='flex flex-col'>
                <input className='mb-3 border-black rounded text-black' type='text' placeholder='Username' onChange={(e) => setNewUsername(e.target.value)} />
                <input className='mb-3 border-black rounded text-black' type='text' placeholder='First Name' onChange={(e) => setNewFirstName(e.target.value)} />
                <input className='mb-3 border-black rounded text-black' type='text' placeholder='Last Name' onChange={(e) => setNewLastName(e.target.value)} />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        )}
        
    </div>
  )
}

export default UserInfo