import React, {useState} from 'react'

const UserInfo = ({user, changesAllowed, editUserSubscription}) => {

  const [edit, setEdit] = useState(false);
  const [newSubscription, setNewSubscription] = useState('');


  const handleEdit = () => {
    setEdit(true);
  }

  const handleCancel = () => {
    setEdit(false);
  }

  const handleSave = async () => {
    // wait for backend to implement this
    await editUserSubscription(user.email, user.subscription, newSubscription);
    setEdit(false);
  }

  return (
    <div className='mb-6'>
        <div className='flex'>
            <h2 className='pe-3'>Subscription</h2>
            <button className={!changesAllowed ? 'invisible' : edit ? 'invisible' : 'visible'} onClick={handleEdit}>Edit Subscription</button>
        </div>
        <h2>--------------------</h2>
        {!edit ? (
            <div>
                <h2>Subscription: {user.subscription}</h2>
            </div>
        ) : (
            <div className='flex flex-col'>
                <select 
                    className='mb-3 border-black rounded text-black' 
                    onChange={(e) => setNewSubscription(e.target.value)}
                    value={newSubscription}
                >
                    <option value='' disabled>Select a new subscription</option>
                    <option value='Guest' disabled={user.subscription === 'Guest'}>Guest</option>
                    <option value='Basic' disabled={user.subscription === 'Basic'}>Basic</option>
                    <option value='Premium' disabled>Premium - Coming Soon!</option>
                </select>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        )}
        
    </div>
  )
}

export default UserInfo